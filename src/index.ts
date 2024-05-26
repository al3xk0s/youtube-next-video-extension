import { youtubeAPI } from "./api/api";
import { FilterString, filtres } from "./api/filters";
import { VideoResponseSmall } from "./api/models/video";
import { getActiveTabUrl } from "./lib/chromeAPI";
import { getVideoID, isVideo, isYoutube } from "./lib/youtube";
import { IFilterRepo, LocalStorageFilterRepo } from "./repo/filterRepo";
import { $display } from "./viewElements/display";
import { $filterButton } from "./viewElements/filterButton";
import { $targetButtons } from "./viewElements/targetButtons";

type Mode = 'next' | 'previous';

type Args = {
    mode: Mode;
    filter?: FilterString;
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

export const execute = wrapFromErrorHandler(({ mode, filter = 'long' }: Args) => {
    $display.initial();

    const validateResult = (res: VideoResponseSmall | undefined) => {
        if(res != null) return;

        const message = mode === 'next'
            ? 'It\'s last video'
            : 'It\'s first video';

        throw new Error(message);
    }
    
    const openVideo = (url: string, id: string) => {
        const tabUrl = new URL(url);
        window.open(tabUrl.origin + tabUrl.pathname + `?v=${id}`, '_blank')
    }

    const main = async () => {
        const url = new URLSearchParams(window.location.search).get('url') ?? await getActiveTabUrl();

        if (!isYoutube(url) || !isVideo(url)) throw new Error('Is not youtube or video');

        let videoID: string;
        let video: VideoResponseSmall;
        let channelID: string;
        
        try {            
            videoID = getVideoID(url)!;
            video = await youtubeAPI.getSmallVideoResponse(videoID);
            channelID = video.snippet.channelId;        
        } catch(e) {
            throw new Error(e.toString())
        }

        const targetVideo = await youtubeAPI.getVideoChronologicOrder(
            channelID,
            video,            
            filtres.values[filter] ?? filtres.values.long,
            mode,
        );        

        validateResult(targetVideo);
        openVideo(url, targetVideo!.id);
    }

    return main();
})

const repo: IFilterRepo = LocalStorageFilterRepo;

const subscribeTargetButtons = () => {
    const onTargetButtonClick = async (mode: Mode) => {
        $targetButtons.deactivate();
        await execute({ mode, filter: await repo.getValue()});
        $targetButtons.activate();
    }

    $targetButtons.nextButton.addEventListener('click', () => onTargetButtonClick('next'));
    $targetButtons.previousButton.addEventListener('click', () => onTargetButtonClick('previous'));
}

const subscribeFilterButton = () => {
    $filterButton.listen(v => repo.setValue(v!));

    const setNextFilter = async () => {
        const current = await repo.getValue();
        const next = filtres.nextFilter(current);

        return $filterButton.setFilterValue(next);
    }

    $filterButton.button.addEventListener('click', setNextFilter);
}

const init = async () => {
    subscribeTargetButtons();
    subscribeFilterButton();

    $display.initial();
    $filterButton.setFilterValue(await repo.getValue());
}

init();
