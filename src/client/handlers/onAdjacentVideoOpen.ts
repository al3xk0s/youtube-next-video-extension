import { AdjacentVideoType, BackendExtensionUrlResponse, Message, MessageName } from "../../models/Message";
import { getVideoWatchUrl } from "../../utils/youtube";
import { onBackendUrlOpen } from "./onBackendUrlOpen";

export const onAdjacentVideoOpen = async (type: AdjacentVideoType, isMiddleMouseClick: boolean) => onBackendUrlOpen(
    isMiddleMouseClick,
    (video) => {
        const message = Message[MessageName.adjacentVideo](video, type);

        return chrome.runtime.sendMessage(message) as Promise<BackendExtensionUrlResponse>;
    },
    getVideoWatchUrl,
);
