import { VideoFilter } from "./filters";
import { SearchResponse } from "./models/search";
import { SearchParts, joinParams } from "./models/searchParts";
import { VideoResponseSmall } from "./models/video";

export const youtubeAPI = (() => {
    const API_KEY = 'AIzaSyDqLwyHMwUjZ2_Jni9E98cfjWlWAHdQfL8';

    const getVideosResponse = async (videosIDs: string[], parts: SearchParts[] = ['snippet']) => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=${joinParams(...parts)}&id=${joinParams(...videosIDs)}&key=${API_KEY}`;

        const res = await fetch(url);
        const data = JSON.parse(await res.text()) as SearchResponse;

        return data.items;
    }

    const getVideoResponse = async (videoID: string, parts: SearchParts[] = ['snippet']) => (await getVideosResponse([videoID], parts))[0];

    const getSearchVideoResponse = async (channelID: string, pageToken: string | undefined, results = 50) => {
        results = Math.min(50, Math.max(0, results));
        const pageTokenQuery = pageToken == null ? '' : `&pageToken=${pageToken}`;
        const url = `https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&channelId=${channelID}&maxResults=${results}&order=date&key=${API_KEY}${pageTokenQuery}`;

        const res = await fetch(url);
        return JSON.parse(await res.text()) as SearchResponse;
    }

    const getChronologicVideoRange = (channelID: string, videoID: string, rangeCount = 10, filter: VideoFilter) => {
        let pageToken : string | undefined
        let targetIterations = 10;
        let isFirst = true;

        const isTargetVideo = (v: VideoResponseSmall) => v.id === videoID

        const createTarget = (ids: VideoResponseSmall[]) => {
            const index = ids.findIndex(isTargetVideo);

            return index > -1
                ? ids.slice(Math.max(0, index - rangeCount), Math.min(index + rangeCount + 1, ids.length))
                : [];
        };

        const searchNext = async (results = 50) : Promise<VideoResponseSmall[]> => {
            const data = await getSearchVideoResponse(channelID, pageToken, results);

            if (isFirst) {
                isFirst = false;
                targetIterations = Math.floor(data.pageInfo.totalResults / results);
            }

            pageToken = data.nextPageToken;

            const videoIds = data.items.map(v => v.id.videoId);
            const videosWithDetails = await getVideosResponse(videoIds, ['contentDetails']);

            return videosWithDetails
                .map(v => ({ id: v.id.videoId, details: v.contentDetails }))
                .filter(filter);
        }

        const findBigRange = async () => {
            let i = 0;
            let cache : VideoResponseSmall[] = [];

            const fetchNextList = async () => {
                const current = await searchNext();
                current.forEach(v => cache.push(v));

                return current;
            }
    
            for (; i < targetIterations; i++) {
                if((await fetchNextList()).find(isTargetVideo) != null) break;
            }
                
            for (; i < targetIterations; i++) {
                if(countStarting(cache, isTargetVideo) - 1 >= rangeCount) break;
                await fetchNextList();
            }

            return cache;
        }

        const main = async () => {
            const bigRange = await findBigRange();
            return createTarget(bigRange);
        }

        return main();
    }

    const getChannelID = async (videoID: string) => (await getVideoResponse(videoID, ['snippet'])).snippet!.channelId;

    return { getChronologicVideoRange, getSearchVideoResponse, getVideoResponse, getVideosResponse, getChannelID }
})();
