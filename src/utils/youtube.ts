import { LocationUrl } from "./location";

export const isYoutube = (url?: string) => new LocationUrl(url).toString().includes('youtube.com');
export const getVideoID = (url?: string) => new LocationUrl(url).parametrs.get('v');
export const isPlaylist = (url?: string) => isYoutube(url) && isVideo(url) && new LocationUrl(url).parametrs.has('list');

export const removePlaylist = (url?: string) => new LocationUrl(url).removeQueries('list').toString();

export const isVideo = (url?: string) => getVideoID(url) != null;
