import { BackendExtensionUrlResponse, Message, MessageName } from "../../models/Message";
import { onBackendUrlOpen } from "./onBackendUrlOpen";

export const onVideosPlaylistOpen = async (isMiddleMouseClick: boolean) => onBackendUrlOpen(isMiddleMouseClick, (video) => {
    const message = Message[MessageName.playlistVideos](video);

    return chrome.runtime.sendMessage(message) as Promise<BackendExtensionUrlResponse>;
});
