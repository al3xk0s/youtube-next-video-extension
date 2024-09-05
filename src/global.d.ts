type Tab = {
    url: string
}

interface ChromeExtensions {
    tabs: {
        query: (params: {active: boolean, lastFocusedWindow: boolean}) => Promise<Tab[]>,
        create: Function;
    },
    webNavigation: {
        onDOMContentLoaded: {
            addListener: Function;
        }
    },
    runtime: {
        sendMessage: Function;
        onMessage: {
            addListener: (
                handler: (request: any, sender: { tab: Tab }, sendResponse: Function) => Promise<any> | boolean
            ) => void;
        },
        getURL: (path: string) => string
    },
    storage: {
        local: {
            get: Function;
            set: Function;
        }
    },
    scripting: {
        executeScript: Function;
    }
}

declare const chrome : ChromeExtensions;
