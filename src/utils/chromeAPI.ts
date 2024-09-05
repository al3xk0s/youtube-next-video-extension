export const getActiveTabUrl = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab.url;
}

export const sendClientMessage = (message: any) => chrome.runtime.sendMessage(message);
export const useExtensionHref = (path: string) => chrome.runtime.getURL(path);
