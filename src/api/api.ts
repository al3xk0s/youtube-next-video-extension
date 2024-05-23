import { countStarting, filterObject } from "../lib/collections";
import { createQuery, createUrl } from "../lib/url";
import { API_KEY } from "./api_key";
import { VideoFilter } from "./filters";
import { SearchResponse } from "./models/search";
import { SearchPart, joinParams } from "./models/searchParts";
import { VideoResponseSmall } from "./models/video";

export const youtubeAPI = (() => {
    const getVideosResponse = async (videosIDs: string[], parts: SearchPart[] = ['snippet']) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/videos', {
            query: {
                part: joinParams(...parts),
                id: joinParams(...videosIDs),
                key: API_KEY,
            }
        });

        const res = await fetch(url);
        const data = JSON.parse(await res.text()) as SearchResponse;

        return data.items;
    }

    const getVideoResponse = async (videoID: string, parts: SearchPart[] = ['snippet']) => (await getVideosResponse([videoID], parts))[0];

    const getSearchVideoResponse = async (channelID: string, pageToken: string | undefined, results = 50) => {
        results = Math.min(50, Math.max(0, results));

        // TODO: переделать ссылки на это

        const url = createUrl('https://youtube.googleapis.com/youtube/v3/search', {
            query: createQuery({
                type: 'video',
                part: 'snippet' as SearchPart,
                channelId: channelID,
                maxResults: results.toString(),
                order: 'date',
                key: API_KEY,
                pageToken: pageToken,
            }),
        });
        
        const query = new URLSearchParams().toString();

        const res = await fetch(url + query);
        return JSON.parse(await res.text()) as SearchResponse;
    }

    // TODO: проработать механизм запросов от даты и до даты, ограничить range единицей
    const getChronologicVideoRange = (channelID: string, videoID: string, rangeCount = 10, filter: VideoFilter) => {
        if(rangeCount <= 0) throw new Error(`Illegal argument range: ${rangeCount}`);

        let pageToken : string | undefined

        const isTargetVideo = (v: VideoResponseSmall) => v.id === videoID

        const createTarget = (ids: VideoResponseSmall[]) => {
            const index = ids.findIndex(isTargetVideo);

            return index > -1
                ? ids.slice(Math.max(0, index - rangeCount), Math.min(index + 1 + rangeCount, ids.length))
                : [];
        };

        const searchNext = async (results = 50) : Promise<VideoResponseSmall[]> => {
            const data = await getSearchVideoResponse(channelID, pageToken, results);                      

            pageToken = data.nextPageToken;

            const videoIds = data.items.map(v => v.id.videoId);
            const videosWithDetails = await getVideosResponse(videoIds, ['contentDetails']);

            return videosWithDetails
                .map(v => ({ id: v.id.videoId, details: v.contentDetails! }))
                .filter(filter);
        }

        const findBigRange = async () => {
            let cache : VideoResponseSmall[] = [];
            
            const hasTargetAndRange = () => countStarting(cache, isTargetVideo) - 1 >= rangeCount;
            const hasNextResults = () => pageToken != null;

            const fetchNextList = async () => {
                const current = await searchNext();
                current.forEach(v => cache.push(v));

                return current;
            }

            while(true) {                
                await fetchNextList();

                if(!hasNextResults() || hasTargetAndRange()) return cache;
            }
        }

        const main = async () => {
            const bigRange = await findBigRange();
            throw new Error(`${bigRange.length}: ${bigRange.find(isTargetVideo) != null}`);
            return createTarget(bigRange);
        }

        return main();
    }

    const getChannelID = async (videoID: string) => (await getVideoResponse(videoID, ['snippet'])).snippet!.channelId;

    return { getChronologicVideoRange, getSearchVideoResponse, getVideoResponse, getVideosResponse, getChannelID }
})();
