import { Thumbnail, Localized, YoutubeDataResponse, TypedEntity, PartsType } from './core';

export type VideoList = YoutubeDataResponse<VideoListItem, 'youtube#videoListResponse'>;

export type VideoListParts = PartsType<VideoListItem>;

export interface VideoListItem extends TypedEntity<'youtube#video'> {
    id: string;
    snippet?: VideoListSnippet;
    contentDetails?: VideoListContentDetails;
    status?: VideoListStatus;
    statistics?: VideoListStatistics;
}

export interface VideoListSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags?: (string)[] | null;
    categoryId: string;
    liveBroadcastContent: string;
    localized: Localized;
    defaultAudioLanguage: string;
}
export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}

export interface VideoListContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: ContentRating;
    projection: string;
}

export interface ContentRating {
}

export interface VideoListStatus {
    uploadStatus: string;
    privacyStatus: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
}
export interface VideoListStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}
export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
