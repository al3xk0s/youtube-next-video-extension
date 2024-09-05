import { AdjacentVideoType, BackendExtensionUrlResponse, Message, MessageName } from "../../models/Message";
import { openUrl } from "../../utils/location";
import { force } from "../../utils/operators";
import { getVideoID } from "../../utils/youtube";

export const onBackendUrlOpen = async (isMiddleMouseClick: boolean, getMessage: (video: string) => Promise<BackendExtensionUrlResponse>) => {
    const video = getVideoID(location.href);
    if(video == null) return;

    const res = await getMessage(video);

    // TODO: handle user error
    openUrl(force(res.data?.url), isMiddleMouseClick);
}
