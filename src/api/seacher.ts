import { BaseYouAPI } from "./baseYoutubeAPI";
import { VideoSmall } from "./models/video";

export type SearcherWorkerProps = {
    maxResults?: number;
    pageToken?: string;
}

export type SearcherWorker<T> = {
    exec: (props: SearcherWorkerProps) => Promise<T>;
    tokenRetriever: (value: T) => string | undefined;
    idsRetriever: (value: T) => string[];
}

export type CreateSearcherProps<T> = {
    worker: SearcherWorker<T>;
    maxResults?: number;
    initialPageToken?: string;
    filter?: (v: VideoSmall) => boolean;
    mapper?: (v: VideoSmall[]) => VideoSmall[];
}

export const createVideosSearcher = <T>({
    worker,
    maxResults = 50,        
    initialPageToken,
    filter = (v) => true,
    mapper = (v) => v,
}: CreateSearcherProps<T>) => {
    let pageToken = initialPageToken;
    let isFirst = true;

    const searchNext = async () => {
        const data = await worker.exec({maxResults, pageToken});                      

        if(isFirst) {
            isFirst = false;
        }

        pageToken = worker.tokenRetriever(data);

        const videoIds = worker.idsRetriever(data);
        const videosWithDetails = await BaseYouAPI.getSmallVideoList(videoIds);

        return mapper(videosWithDetails.filter(filter));
    }

    return {
        get pageToken() { return pageToken },
        get hasNext() { return isFirst || pageToken != null },
        get isFirst() { return isFirst },
        searchNext,
    }
}
