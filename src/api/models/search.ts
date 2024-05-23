import { VideoResponse } from "./video";

export type Resource = VideoResponse;

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
