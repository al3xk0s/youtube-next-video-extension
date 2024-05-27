import { PageInfo } from './PageInfo';
import { TypedEntity } from './TypedEntity';

export interface YoutubeDataResponse<T, Kind extends string = string> extends TypedEntity<Kind> {
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo?: PageInfo;
    items?: T[];
}
