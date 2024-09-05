import { YouTubeAPI } from "./YoutubeAPI";

export type SearcherWorkerProps = {
    maxResults?: number;
    pageToken?: string;
}

export type SearcherWorker<T, R> = {
    exec: (props: SearcherWorkerProps) => Promise<T>;
    tokenRetriever: (value: T) => string | undefined;
    resultsRetriever: (value: T) => R[];
}

export type CreateSearcherProps<T, R> = {
    worker: SearcherWorker<T, R>;
    maxResults?: number;
    initialPageToken?: string;
}

export const createVideosSearcher = <T, R>({
    worker,
    maxResults = 50,        
    initialPageToken,
}: CreateSearcherProps<T, R>) => {
    let pageToken = initialPageToken;
    let isFirst = true;

    const searchNext = async () => {
        const data = await worker.exec({maxResults, pageToken});                      

        if(isFirst) {
            isFirst = false;
        }

        pageToken = worker.tokenRetriever(data);

        return worker.resultsRetriever(data);
    }

    return {
        get pageToken() { return pageToken },
        get hasNext() { return isFirst || pageToken != null },
        get isFirst() { return isFirst },
        searchNext,
    }
}
