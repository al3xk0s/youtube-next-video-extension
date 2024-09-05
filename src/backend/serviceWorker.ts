chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
    if (!url.startsWith('https://www.youtube.com/watch')) return;
    
    const { options } = await chrome.storage.local.get('options');
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['client.js'],
        ...options
    });
});

chrome.runtime.onMessage.addListener(async ({ name, options }) => {
    if (name === 'inject-programmatic') {
        await chrome.storage.local.set({ options });
        await chrome.tabs.create({
            url: 'https://example.com/#inject-programmatic'
        });
    }
});
