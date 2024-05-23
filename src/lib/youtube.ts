export const isYoutube = (url: string) => url.includes('youtube.com');
export const getVideoID = (url: string) => new URLSearchParams(new URL(url).search).get('v');

export const isVideo = (url: string) => getVideoID(url) != null;
