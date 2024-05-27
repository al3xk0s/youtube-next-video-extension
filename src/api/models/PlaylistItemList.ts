import { ResourceVideoID, Thumbnail, TypedEntity, YoutubeDataResponse, PartsType } from './core';

export type PlaylistItemList = YoutubeDataResponse<PlaylistItem, 'youtube#playlistItemListResponse'>

export type PlaylistItemListParts = PartsType<PlaylistItem>;

export interface PlaylistItem extends TypedEntity<'youtube#playlistItem'> {
    id: string;
    snippet?: PlaylistItemsListSnippet;
    contentDetails?: PlaylistItemsListContentDetails;
}

export interface PlaylistItemsListSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: ResourceVideoID;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
}
export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}

export interface PlaylistItemsListContentDetails {
    videoId: string;
    videoPublishedAt: string;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
