import { force } from "../lib/operators";
import { createQuery, createUrl } from "../lib/url";
import { API_KEY } from "./api_key";
import { VideoFilter } from "./filters";
import { SearchResponse } from "./models/SearchVideoList";
import { SearchPart, joinParams } from "./searchParts";
import { VideoSmall } from "./models/videoSmall";

export const YoutubeAPI = (() => {
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

    const getChannelID = async (videoID: string) => (await getVideo(videoID, ['snippet'])).snippet!.channelId;

    return { getVideoChronologicOrder, getSearchVideosResponse: getSearchVideosList, getVideoResponse: getVideo, getVideosResponse: getVideoList, getChannelID, getSmallVideoResponse: getSmallVideo, getSmallVideosResponse: getSmallVideoList }
})();
