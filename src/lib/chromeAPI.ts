export const getActiveTabUrl = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab.url;
}
