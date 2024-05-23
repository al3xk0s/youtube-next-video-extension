import { VideoResponse } from "./video";

export type SearchPart = Exclude<keyof VideoResponse, 'kind' | 'etag' | 'id'>;

export const joinParams = (...parts: string[]) => parts.join(',');
