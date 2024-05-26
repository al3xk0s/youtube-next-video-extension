import { countStarting, filterObject } from "../lib/collections";
import { createQuery, createUrl } from "../lib/url";
import { API_KEY } from "./api_key";
import { VideoFilter } from "./filters";
import { SearchResponse } from "./models/search";
import { SearchPart, joinParams } from "./models/searchParts";
import { VideoResponseSmall } from "./models/video";

export const youtubeAPI = (() => {
    const validateRes = <T extends object>(res: T) => {
        if('error' in res && res.error != null) {
            const error = res.error as { message?: string, code?: string }

            throw new Error(error.message + `(${error.code})`);
        }

        return res;
    }

    const getVideosResponse = async (videosIDs: string[], parts: SearchPart[] = ['snippet']) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/videos', {
            query: createQuery({
                part: joinParams(...parts),
                id: joinParams(...videosIDs),
                key: API_KEY,
            })
        });

        const res = await fetch(url);
        const data = JSON.parse(await res.text()) as SearchResponse;

        return validateRes(data).items;
    }

    const getSmallVideosResponse = (videosIDs: string[]) : Promise<VideoResponseSmall[]> =>
        getVideosResponse(videosIDs, ['snippet', 'contentDetails'])
        .then(res => res.map(v => ({ id: v.id as string, snippet: v.snippet!, details: v.contentDetails!})))

    const getVideoResponse = (videoID: string, parts: SearchPart[] = ['snippet']) =>  getVideosResponse([videoID], parts).then(v => v[0]);
    const getSmallVideoResponse = (videoID: string) => getSmallVideosResponse([videoID]).then(v => v[0]);

    type SearchVideosQuery = {
        maxResults?: number,
        pageToken?: string,
        order?: string,
        publishedAfter?: string,
        publishedBefore?: string,
    }

    const getSearchVideosResponse = async (channelID: string, query: SearchVideosQuery = {}) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/search', {
            query: createQuery({
                channelId: channelID,
                type: 'video',
                part: 'snippet' as SearchPart,
                ...query,
                key: API_KEY,
            }),
        });
  
        const res = await fetch(url);
        return validateRes(JSON.parse(await res.text()) as SearchResponse);
    }

    type CreateVideoSnippetSearcherArgs = Omit<SearchVideosQuery, 'pageToken'> & {
        channelID: string,                
        initialPageToken?: string,        
        filter?: VideoFilter,
        mapResults?: (data: VideoResponseSmall[]) => VideoResponseSmall[];
    }

    const createVideosSnippetSearcher = ({
        channelID,
        maxResults = 50,        
        initialPageToken,
        filter = () => true,
        mapResults = (v) => v,
        ...query
    }: CreateVideoSnippetSearcherArgs) => {
        let pageToken = initialPageToken;
        let isFirst = true;

        const searchNext = async () : Promise<VideoResponseSmall[]> => {
            const data = await getSearchVideosResponse(channelID, {
                ...query,
                pageToken,
                maxResults,
            });                      

            if(isFirst) {
                isFirst = false;
            }

            pageToken = data.nextPageToken;

            const videoIds = data.items.map(v => v.id.videoId);
            const videosWithDetails = await getSmallVideosResponse(videoIds);

            return mapResults(videosWithDetails.filter(filter));
        }

        return {
            get pageToken() { return pageToken },
            get hasNext() { return isFirst || pageToken != null },
            get isFirst() { return isFirst },
            searchNext,
        }
    }

// TODO: проработать механизм запросов от даты и до даты, ограничить range единицей
    const getVideoChronologicOrder = (channelID: string, video: VideoResponseSmall, filter: VideoFilter, order: 'next' | 'previous') => {
        const videoID = video.id;
        const publishedAt = video.snippet.publishedAt;

        const searcherArgs : CreateVideoSnippetSearcherArgs = {
            channelID,
            order: 'date',
            maxResults: 50,
            filter: filter,
        }

        const searcher = order === 'next'
            ? createVideosSnippetSearcher({...searcherArgs, publishedAfter: publishedAt, mapResults: (res) => res.slice().reverse()})
            : createVideosSnippetSearcher({...searcherArgs, publishedBefore: publishedAt});

        // TODO: почему то у VideoResponseSmall id === undefined
        const findTargetInList = (videos: VideoResponseSmall[]) => {
            for (const video of videos) {
                if(video.id === videoID) continue;
                return video;
            }

            return;
        }

        const main = async () => {
            while(true) {
                const values = await searcher.searchNext();
                const targetValue = findTargetInList(values);

                if(targetValue != null) return targetValue;
                if(!searcher.hasNext) return;
            }
        }

        return main();
    }

    const getChannelID = async (videoID: string) => (await getVideoResponse(videoID, ['snippet'])).snippet!.channelId;

    return { getVideoChronologicOrder, getSearchVideosResponse, getVideoResponse, getVideosResponse, getChannelID, getSmallVideoResponse, getSmallVideosResponse }
})();
