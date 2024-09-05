import { YouTubeAPI } from "./YoutubeAPI";
import { createVideosSearcher } from "./seacher";

export const DataProvider = (() => {
    const createPlaylistSearcher = (playlistID: string) => createVideosSearcher<Awaited<ReturnType<typeof YouTubeAPI['getPlaylistItemList']>>, string>({
        worker: {
            exec: (query) => YouTubeAPI.getPlaylistItemList(playlistID, ['contentDetails'], query),
            tokenRetriever: (v) => v.nextPageToken,
            resultsRetriever: (v) => v.items?.map(v => v.contentDetails!.videoId) ?? []
        },
    });

    const getNextAndPreviousVideo = async (rootVideoID: string, playlistID: string) => {
        const searcher = createPlaylistSearcher(playlistID);

        const cache = [] as string[];

        const getRootVideoIndex = () => cache.findIndex(v => v === rootVideoID);

        const needStopSearch = () => {
            const index = getRootVideoIndex();
            if(index === -1) return false;

            const rootIsNotLast = index < cache.length - 1;
            return rootIsNotLast;
        };

        while(true) {
            const results = await searcher.searchNext();
            results.forEach(v => cache.push(v));

            if(!searcher.hasNext || needStopSearch()) break;
        }

        const targetIndex = getRootVideoIndex();
        if(targetIndex === -1 || cache.length === 0) throw new Error('Error of search current video');

        const nextVideo = targetIndex > 0 ? cache[targetIndex - 1] : undefined;
        const previousVideo = targetIndex < cache.length - 1 ? cache[targetIndex + 1] : undefined;

        return {
            nextVideo,
            previousVideo,
        };
    }
    
    const getChannelInfoByVideo = async (videoID: string) : Promise<{ channelID: string, uploadsPlaylistID: string }> => {
        const video = await YouTubeAPI.getVideo(videoID, ['snippet']);
        const channelID = video?.snippet?.channelId;

        if(channelID == null) throw new Error('Error of search channel');

        const channel = await YouTubeAPI.getChannel(channelID, ['contentDetails']);
        
        const uploadsPlaylistID = channel?.contentDetails?.relatedPlaylists?.uploads;
        if(uploadsPlaylistID == null) throw new Error('Error of fetch channel videos');

        return {
            channelID,
            uploadsPlaylistID,
        }
    }    

    return {
        getChannelInfoByVideo,
        getNextAndPreviousVideo,
    }
})();
