import { VideoResponse, VideoSearchResponse } from "./video";

export type Resource = VideoSearchResponse | VideoResponse;

export interface SearchResponse {
    kind: "youtube#searchListResponse",
    etag: string,
    nextPageToken?: string,
    prevPageToken?: string,
    regionCode: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: Resource[]
}
