import { Thumbnail, Localized, YoutubeDataResponse, TypedEntity, PartsType } from './core';

export type ChannelList = YoutubeDataResponse<ChannelsListItem, 'youtube#channelListResponse'>;

export type ChannelListParts = PartsType<ChannelsListItem>;

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface ChannelsListItem extends TypedEntity<'youtube#channel'> {    
    id: string;
    snippet?: ChannelsListSnippet;
    contentDetails?: ChannelsListContentDetails;
    statistics?: ChannelsListStatistics;
    status?: ChannelsListStatus;
}

export interface ChannelsListSnippet {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    localized: Localized;
    country: string;
}

export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
}

export interface ChannelsListContentDetails {
    relatedPlaylists: ChannelsListRelatedPlaylists;
}

export interface ChannelsListRelatedPlaylists {
    likes: string;
    uploads: string;
}

export interface ChannelsListStatistics {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
}

export interface ChannelsListStatus {
    privacyStatus: string;
    isLinked: boolean;
    longUploadsStatus: string;
    madeForKids: boolean;
}
