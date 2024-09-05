import { AdjacentVideoType, BackendExtensionUrlResponse, Message, MessageName } from "../../models/Message";
import { sendClientMessage } from "../../utils/chromeAPI";
import { getVideoWatchUrl } from "../../utils/youtube";
import { onBackendUrlOpen } from "./onBackendUrlOpen";

export const onAdjacentVideoOpen = async (type: AdjacentVideoType, isMiddleMouseClick: boolean) => onBackendUrlOpen(
    isMiddleMouseClick,
    (video) => {
        const message = Message[MessageName.adjacentVideo](video, type);

        return sendClientMessage(message) as Promise<BackendExtensionUrlResponse>;
    },
    getVideoWatchUrl,
);
