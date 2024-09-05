interface ChromeExtensions {
    tabs: {
        query: (params: {active: boolean, lastFocusedWindow: boolean}) => Promise<{ url: string }[]>,
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
            addListener: Function;
        }
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
