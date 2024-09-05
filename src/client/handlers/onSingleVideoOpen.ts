import { LocationUrl, openUrl } from "../../utils/location";
import { isPlaylist, removePlaylist } from "../../utils/youtube";

export const onSingleVideoOpen = (isMiddleMouseClick: boolean) => {
    if(!isPlaylist()) return;
    openUrl(removePlaylist(), isMiddleMouseClick);
}
