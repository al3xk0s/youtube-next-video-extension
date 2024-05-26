import { VideoSearchResponse } from "./video";

export type SearchPart = Exclude<keyof VideoSearchResponse, 'kind' | 'etag' | 'id'>;

export const joinParams = (...parts: string[]) => parts.join(',');
