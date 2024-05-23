declare const chrome: {
    tabs: {
        query: (params: {active: boolean, lastFocusedWindow: boolean}) => Promise<{ url: string }[]>
    },
};