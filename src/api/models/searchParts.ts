import { VideoResponse } from "./video";

export type SearchParts = Exclude<keyof VideoResponse, 'kind' | 'etag' | 'id'>;

export const joinParams = (...parts: string[]) => encodeURIComponent(parts.join(','));
