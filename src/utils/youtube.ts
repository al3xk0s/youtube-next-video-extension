import { LocationUrl } from "./location";

export const isYoutube = (url?: string) => new LocationUrl(url).toString().includes('youtube.com');
export const isPlaylist = (url?: string) => isYoutube(url) && isVideo(url) && new LocationUrl(url).parametrs.has('list');

export const removePlaylist = (url?: string) => new LocationUrl(url).removeQueries('list').toString();

export const isVideo = (url?: string) => getVideoID(url) != null;

export const getVideoID = (url?: string) => new LocationUrl(url).parametrs.get('v');

export const getVideoWatchUrl = (videoID: string) => `https://www.youtube.com/watch?v=${videoID}`;
export const getVideoAndPlaylistUrl = (videoID: string, playlistID: string) => `https://www.youtube.com/watch?v=${videoID}&list=${playlistID}`;