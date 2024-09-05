import { AdjacentVideoType, BackendExtensionResponse, BackendExtensionUrlResponse, MessageMatcher, MessageName } from "../models/Message";
import { DataProvider } from "./api/DataProvider";

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }: { tabId: string, url: string }) => {
    if (!url.startsWith('https://www.youtube.com/watch')) return;
    
    const { options } = await chrome.storage.local.get('options');
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['client.js'],
        ...options
    });
});

type VideoPair = Awaited<ReturnType<typeof DataProvider.getNextAndPreviousVideo>>;

const wrapHandler = <F extends (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>>(handler: F) => {
    return async (...args: Parameters<F>) : Promise<BackendExtensionResponse<Awaited<ReturnType<F>>>> => {
        try {
            const data = await handler(...args);
            return { isError: false, data }
        } catch(e) {
            return { isError: true, userMessage: e.toString() }
        }
    }
}

const onAdjacentVideo = wrapHandler(async (videoID: string, type: AdjacentVideoType) => {    
    const getTarget = ({ nextVideo, previousVideo }: VideoPair) => {
        if(type === AdjacentVideoType.next) return nextVideo;
        if(type === AdjacentVideoType.previos) return previousVideo;
    }

    const getValidateErrorMessage = () => {
        if(type === AdjacentVideoType.next) return 'Текущее видео - последнее';
        if(type === AdjacentVideoType.previos) return 'Текущее видео - первое';
    }

    const validateResult = (target: string | undefined) => {        
        if(target != null) return;
        throw new Error(getValidateErrorMessage());
    }

    const main = async () => {
        const { channelID, uploadsPlaylistID } = await DataProvider.getChannelInfoByVideo(videoID);

        const targetVideo = getTarget(await DataProvider.getNextAndPreviousVideo(
            videoID,
            uploadsPlaylistID,
        ));

        validateResult(targetVideo);
        return targetVideo!;
    }

    return { url: await main() };
})

const onOpenVideoOnPlayList = wrapHandler(async (videoID: string) => {
    const { channelID, uploadsPlaylistID } = await DataProvider.getChannelInfoByVideo(videoID);

    return { url: uploadsPlaylistID }
})

const handler = new MessageMatcher();

handler
    .addCase(MessageName.adjacentVideo, async ({ currentVideoID, type }) => {
        return await onAdjacentVideo(currentVideoID, type);
    })
    .addCase(MessageName.playlistVideos, async ({ currentVideoID }) => {
        return await onOpenVideoOnPlayList(currentVideoID);
    })

const UnknownResponse : BackendExtensionResponse<any> = { isError: true, userMessage: 'Поступил неизвестный запрос' };

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        new Promise<any>(async (resolve, rej) => {
            const res = await handler.execute(request);

            resolve(sendResponse(res == null ? UnknownResponse : res));
        });

        return true;
    }
)
