import { Thumbnail,  ResourceVideoID, YoutubeDataResponse, TypedEntity, PartsType } from './core';

export type SearchVideoList = YoutubeDataResponse<SearchVideoListItem, 'youtube#searchListResponse'> & {
    regionCode: string;
}

export type SearchVideoListParts = PartsType<SearchVideoListItem>;

export interface SearchVideoListItem extends TypedEntity<'youtube#searchResult'> {
    id: ResourceVideoID;
    snippet?: SearchVideoListSnippet;
}

export interface SearchVideoListSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
}

export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
}
