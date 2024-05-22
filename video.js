/**
 * @typedef { { filter?: 'shorts' | 'long' | 'all', mode?: 'next' | 'previous' } } Args
 */

const filtres = {
    get values() { return Object.keys(filtres).filter(k => k !== 'values' && k !== 'nextFilter') },
    nextFilter(value) { return this.values[(this.values.indexOf(value) + 1) % this.values.length] },
    'long': 'movie',
    'shorts': 'episode',
    'all': 'any',
}

const getActiveTabUrl = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab.url;
}

const display = (() => {
    const el = document.querySelector('#text-display');

    const setText = (value) => el.textContent = value.trim();
    const setVariant = (variant) => {
        el.classList.remove(
            ...Array.from(el.classList.entries())
                .map(([k, v]) => v)
                .filter(v => v.includes('display-text')
            )
        );
        el.classList.add(variant);
    }

    const text = (value) => {
        setText(value);
        setVariant('display-text');
    };

    const error = (value) => {
        setText(value);
        setVariant('display-text-error');
    }

    const initial = () => text('Previous or next video')

    return {
        text,
        error,
        initial,
    }
})()

/**
 * 
 * @param {Args} args 
 */
const nextUVideo = ({ filter = 'long', mode = 'next' }) => {
    display.initial();

    const API_KEY = 'AIzaSyDqLwyHMwUjZ2_Jni9E98cfjWlWAHdQfL8';

    const getChannelVideoPair = async (videoID) => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${API_KEY}`;

        const res = await fetch(url);
        const data = JSON.parse(await res.text());

        return data.items[0].snippet.channelId;
    }

    /**
     * 
     * @param {string} channelID 
     * @param {string} videoID 
     * @param {number} rangeCount 
     * @returns { Promise<string[]> }
     */
    const getChronologicVideoRange = async (channelID, videoID, rangeCount = 10) => {
        let pageToken
        let targetIterations = 10;
        let isFirst = true;

        const search = async (results = 50) => {
            results = Math.min(50, Math.max(0, results));
            const pageTokenQuery = pageToken == null ? '' : `&pageToken=${pageToken}`;
            const url = `https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&channelId=${channelID}&maxResults=${results}&order=date&key=${API_KEY}${pageTokenQuery}`;

            const res = await fetch(url);
            const data = JSON.parse(await res.text());

            pageToken = data.nextPageToken;

            const videos = data.items.map(v => v.id.videoId);

            const index = videos.indexOf(videoID);

            if (isFirst) {
                isFirst = false;
                targetIterations = Math.floor(data.pageInfo.totalResults / results);
            }

            return index > -1
                ? videos.slice(Math.max(0, index - rangeCount), Math.min(index + rangeCount + 1, videos.length))
                : [];
        }

        for (let i = 0; i < targetIterations; i++) {
            const res = await search();
            if (res.length > 0) return res;
        }

        return [];
    }

    const isYoutube = (url) => url.includes('youtube.com');
    const getVideoID = (url) => new URLSearchParams(new URL(url).search).get('v');

    const isVideo = (url) => getVideoID(url) != null;

    /** 
     * @param { string } rootID
     * @param { string[] } data
    */
    const getTargetVideoID = (rootID, data) => {
        const target = data[mode === 'next' ? 0 : data.length - 1];

        if (target !== rootID) return target;

        const message = mode === 'next'
            ? 'It\'s last video'
            : 'It\'s first video';

        display.error(message);
    }
    
    const openVideo = (url, id) => {
        const tabUrl = new URL(url);
        window.open(tabUrl.origin + tabUrl.pathname + `?v=${id}`, '_blank')
    }

    const main = async () => {
        const url = await getActiveTabUrl();

        if (!isYoutube(url) || !isVideo(url)) return;

        const videoID = getVideoID(url);
        const channelID = await getChannelVideoPair(videoID);

        const res = await getChronologicVideoRange(channelID, videoID, 1);

        if (res.length === 0) {
            display.error('Not found');
            return;
        }

        const id = getTargetVideoID(videoID, res);
        if(id == null) return;

        openVideo(url, id);
    }

    return main();
}

const $back = document.querySelector('#video-back');
const $next = document.querySelector('#video-next');
const $type = document.querySelector('#video-type');

const getCurrentFilter = () => localStorage.getItem('videoType') ?? 'long';

const setCurrentFilter = (value) => {
    localStorage.setItem('videoType', value);
    $type.textContent = value;
}

const setNextCurrentFilter = () => setCurrentFilter(filtres.nextFilter(getCurrentFilter()));

const deactivateButtons = () =>
    [$back, $next].forEach(b => b.classList.replace('btn', 'buttons__button-inactive'));

const activateButtons = () =>
    [$back, $next].forEach(b => b.classList.replace('buttons__button-inactive', 'btn'));

$back.addEventListener('click', async () => {
    deactivateButtons();
    await nextUVideo({mode: 'previous', filter: getCurrentFilter()});
    activateButtons();
});

$next.addEventListener('click', async () => {
    deactivateButtons();
    await nextUVideo({mode: 'next', filter: getCurrentFilter()})
    activateButtons();
});

$type.addEventListener('click', setNextCurrentFilter);

setCurrentFilter(getCurrentFilter());
display.initial();