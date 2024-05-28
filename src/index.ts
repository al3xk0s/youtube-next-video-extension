import { DataProvider } from "./api/DataProvider";
import { getActiveTabUrl } from "./lib/chromeAPI";
import { createQuery, createUrl } from "./lib/url";
import { getVideoID, isVideo, isYoutube } from "./lib/youtube";
import { $display } from "./viewElements/display";
import { $targetButtons } from "./viewElements/targetButtons";

type Mode = 'next' | 'previous';

type Args = {
    mode: Mode;
}

const wrapFromErrorHandler = <F extends (...args: Parameters<F>) => ReturnType<F>>(exec: F) => {
    return async (...args: Parameters<F>) : Promise<Awaited<ReturnType<F>> | undefined> => {
        try {
            return (await exec(...args) as Awaited<ReturnType<F>>);                    
        } catch(e) {
            $display.error((e as Error).message);
        }
    }
}

const urlOpener = (() => {
    const getBaseUrl = (url: string) => {
        const tabUrl = new URL(url);
        return tabUrl.origin + tabUrl.pathname;
    }

    const open = (url: string) => window.open(url, '_blank');

    const openVideo = (url: string, id: string) =>
        open(
            createUrl(getBaseUrl(url), {
                query: createQuery({ v: id }) 
            })
        );

    const openVideoOnPlayList = (url: string, id: string, playlistID: string) =>
        open(
            createUrl(getBaseUrl(url), {
                query: createQuery({ v: id, list: playlistID }),
            })
        );

    return { openVideo, openVideoOnPlayList }
})();

const getUrlParams = async () => {
    const url = new URLSearchParams(window.location.search).get('url') ?? await getActiveTabUrl();

    if (!isYoutube(url) || !isVideo(url)) throw new Error('Is not youtube or video');

    const videoID = getVideoID(url)!;

    return { url, videoID }
}

type VideoPair = Awaited<ReturnType<typeof DataProvider.getNextAndPreviousVideo>>;

export const getVideo = wrapFromErrorHandler(({ mode }: Args) => {
    $display.initial();

    const getTarget = ({ nextVideo, previousVideo }: VideoPair) => {
        if(mode === 'next') return nextVideo;
        if(mode === 'previous') return previousVideo;
    }

    const getValidateErrorMessage = () => {
        if(mode === 'next') return 'It is last video';
        if(mode === 'previous') return 'It is first video';
    }

    const validateResult = (target: string | undefined) => {        
        if(target != null) return;
        throw new Error(getValidateErrorMessage());
    }

    const main = async () => {
        const { videoID, url } = await getUrlParams();
        const { channelID, uploadsPlaylistID } = await DataProvider.getChannelInfoByVideo(videoID);

        const targetVideo = getTarget(await DataProvider.getNextAndPreviousVideo(
            videoID,
            uploadsPlaylistID,
        ));

        validateResult(targetVideo);
        urlOpener.openVideo(url, targetVideo!);
    }

    return main();
});

export const toPlaylist = wrapFromErrorHandler(async () => {
    $display.initial();
    const { videoID, url } = await getUrlParams();

    const { channelID, uploadsPlaylistID } = await DataProvider.getChannelInfoByVideo(videoID);

    urlOpener.openVideoOnPlayList(url, videoID, uploadsPlaylistID);
});

const subscribeTargetButtons = () => {
    const { nextButton, previousButton, toPlayListButton } = $targetButtons;

    const onTargetButtonClick = async (exec: () => Promise<any>) => {
        $targetButtons.deactivate();
        await exec();
        $targetButtons.activate();
    }

   nextButton.addEventListener('click', () => onTargetButtonClick(() => getVideo({mode: 'next'})));
   previousButton.addEventListener('click', () => onTargetButtonClick(() => getVideo({mode: 'previous'})));
   toPlayListButton.addEventListener('click', () => onTargetButtonClick(toPlaylist));
}

const init = async () => {
    subscribeTargetButtons();

    $display.initial();
}

init();
