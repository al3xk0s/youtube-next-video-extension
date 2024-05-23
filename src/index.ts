import { youtubeAPI } from "./api/api";
import { FilterString, filtres } from "./api/filters";
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

export const execute = ({ mode, filter = 'long' }: Args) => {
    $display.initial();

    const getTargetVideoID = (rootID: string, data: string[]) => {
        const target = data[mode === 'next' ? 0 : data.length - 1];

        if (target !== rootID) return target;

        const message = mode === 'next'
            ? 'It\'s last video'
            : 'It\'s first video';

        $display.error(message);
    }
    
    const openVideo = (url: string, id: string) => {
        const tabUrl = new URL(url);
        window.open(tabUrl.origin + tabUrl.pathname + `?v=${id}`, '_blank')
    }

    const main = async () => {
        const url = await getActiveTabUrl();

        if (!isYoutube(url) || !isVideo(url)) return;

        const videoID = getVideoID(url);
        const channelID = await youtubeAPI.getChannelID(videoID);

        const res = (await youtubeAPI.getChronologicVideoRange(
            channelID,
            videoID,
            1,
            filtres.values[filter] ?? filtres.values.long
        )).map(v => v.id);

        if (res.length === 0) {
            $display.error('Not found');
            return;
        }

        const id = getTargetVideoID(videoID, res);
        if(id == null) return;

        openVideo(url, id);
    }

    return main();
}

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
    $filterButton.listen(v => repo.setValue(v));

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
