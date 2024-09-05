import { openUrl } from "../../utils/location";
import { isPlaylist, removePlaylist } from "../../utils/youtube";

export const onSingleVideoOpen = (isMiddleMouseClick: boolean) => {
    if(!isPlaylist()) return { isError: true, userMessage: 'Открыт не плейлист' };
    openUrl(removePlaylist(), isMiddleMouseClick);

    return { isError: false };
}
