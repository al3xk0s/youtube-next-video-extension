import { force } from "../../utils/operators";
import { createUrl, createQuery } from "../../utils/url";
import { API_KEY } from "./api_key";
import { joinParams } from "./utils/uriUtils";
import { ChannelList, ChannelListParts } from "./models/ChannelList";
import { PlaylistItemList, PlaylistItemListParts } from "./models/PlaylistItemList";
import { SearchVideoList } from "./models/SearchVideoList";
import { VideoList, VideoListParts } from "./models/VideoList";
import { VideoSmall } from "./models/VideoSmall";

export const YouTubeAPI = (() => {
    const validateRes = <T extends object>(res: T) => {
        if('error' in res && res.error != null) {
            const error = res.error as { message?: string, code?: string }

            throw new Error(error.message + `(${error.code})`);
        }

        return res;
    }

    const fetchResponse = async <T extends object>(url: string) => {
        const res = await fetch(url);
        const data = JSON.parse(await res.text()) as T;

        return validateRes(data);
    }

    const createYoutubeQuery = (parts: string[], other?: Record<string, any>) => createQuery({
        part: joinParams(...parts),
        ...(other ?? {}),
        key: API_KEY,
    })

    const getVideoList = (videosIDs: string[], parts: VideoListParts[] = ['snippet']) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/videos', {
            query: createYoutubeQuery(parts, {                
                id: joinParams(...videosIDs),                
            })
        });

        return fetchResponse<VideoList>(url);
    }

    const getSmallVideoList = (videosIDs: string[]) : Promise<VideoSmall[] | undefined> =>
        getVideoList(videosIDs, ['snippet', 'contentDetails'])
        .then(
            res => res.items?.map(v => ({
                    id: force(v.id) as string,
                    channelID: force(v.snippet?.channelId),
                    duration: force(v.contentDetails?.duration),
                    published: force(v.snippet?.publishedAt),
                }))
        )

    const getVideo = (videoID: string, parts: VideoListParts[] = ['snippet']) =>  getVideoList([videoID], parts).then(v => v?.items == null ? undefined : v?.items![0]);
    const getSmallVideo = (videoID: string) => getSmallVideoList([videoID]).then(v => v == null ? undefined : v[0]);

    type SearchQuery = {
        maxResults?: number;
        pageToken?: string;
    }

    type SearchVideosQuery = SearchQuery & {
        order?: string;
        publishedAfter?: string;
        publishedBefore?: string;
    }

    const getSearchVideosList = (channelID: string, query: SearchVideosQuery = {}) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/search', {
            query: createYoutubeQuery(['snippet'], {
                channelId: channelID,
                type: 'video',                
                ...query,
            }),
        });

        return fetchResponse<SearchVideoList>(url);
    }

    const getChannelList = (channelID: string, parts: ChannelListParts[] = ['snippet']) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/channels', {
            query: createYoutubeQuery(parts, {
                id: channelID,                
            })
        });

        return fetchResponse<ChannelList>(url);
    }

    const getChannel = (channelID: string, parts: ChannelListParts[] = ['snippet']) => getChannelList(channelID, parts)
        .then(res => res.items != null ? res.items[0] : undefined);

    const getPlaylistItemList = (playlistID: string, parts: PlaylistItemListParts[] = ['snippet'], query: SearchQuery = {}) => {
        const url = createUrl('https://youtube.googleapis.com/youtube/v3/playlistItems', {
            query: {
                ...createQuery(query),
                ...createYoutubeQuery(parts, {
                    playlistId: playlistID,
                }),
            }
        });

        return fetchResponse<PlaylistItemList>(url);
    }

    return {
        getVideoList,
        getSmallVideoList,
        getVideo,
        getSmallVideo,
        getSearchVideosList,
        getChannelList,
        getChannel,
        getPlaylistItemList,
    }
})()