import { force } from "../lib/operators";
import { createUrl, createQuery } from "../lib/url";
import { API_KEY } from "./api_key";
import { SearchResponse } from "./models/search";
import { SearchPart, joinParams } from "./models/searchParts";
import { VideoSmall } from "./models/video";

export const BaseYouAPI = (() => {
    const validateRes = <T extends object>(res: T) => {
        if('error' in res && res.error != null) {
            const error = res.error as { message?: string, code?: string }

            throw new Error(error.message + `(${error.code})`);
        }

        return res;
    }

    const getVideoList = async (videosIDs: string[], parts: SearchPart[] = ['snippet']) => {
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

    const getSmallVideoList = (videosIDs: string[]) : Promise<VideoSmall[]> =>
        getVideoList(videosIDs, ['snippet', 'contentDetails'])
        .then(
            res => res
                .map(v => ({
                    id: force(v.id) as string,
                    channelID: force(v.snippet?.channelId),
                    duration: force(v.contentDetails?.duration),
                    published: force(v.snippet?.publishedAt),
                }))
        )

    const getVideo = (videoID: string, parts: SearchPart[] = ['snippet']) =>  getVideoList([videoID], parts).then(v => v[0]);
    const getSmallVideo = (videoID: string) => getSmallVideoList([videoID]).then(v => v[0]);

    type SearchVideosQuery = {
        maxResults?: number,
        pageToken?: string,
        order?: string,
        publishedAfter?: string,
        publishedBefore?: string,
    }

    const getSearchVideosList = async (channelID: string, query: SearchVideosQuery = {}) => {
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

    return {
        getVideoList,
        getSmallVideoList,
        getVideo,
        getSmallVideo,
        getSearchVideosList,
    }
})()