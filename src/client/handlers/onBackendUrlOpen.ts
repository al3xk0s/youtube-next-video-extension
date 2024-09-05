import { BackendExtensionUrlResponse } from "../../models/Message";
import { openUrl } from "../../utils/location";
import { getVideoID } from "../../utils/youtube";

export const onBackendUrlOpen = async (
    isMiddleMouseClick: boolean,
    getMessage: (video: string) => Promise<BackendExtensionUrlResponse>,
    formatUrl: (url: string) => string,
) => {
    const video = getVideoID(location.href);
    if(video == null) return { isError: true, userMessage: 'Не открыто видео' };

    const res = await getMessage(video);
    console.log(res);
    if(res.isError) return res;

    openUrl(formatUrl(res.data!.url), isMiddleMouseClick);

    return res;
}
