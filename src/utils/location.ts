import { filterObject } from "./collections";
import { equalsAnyOf } from "./operators";
import { createUrl } from "./url";

export class LocationUrl {
    constructor(url?: string) {
        this._url = new URL(url ?? location.href);
    }

    readonly getQuery = (name: string) => this._url.searchParams.get(name);
    readonly withoutQuery = () => {
        const port = this._url.port !== '' ? `:${this._url.port}` : '';

        return this._url.origin + port + this._url.pathname;
    }

    readonly removeQueries = (...names: string[]) => new LocationUrl(
        createUrl(this.withoutQuery(), { query: filterObject(Object.fromEntries(this._url.searchParams.entries()), (k, v) => !equalsAnyOf(k, names)) })
    );

    get parametrs() {
        return new URLSearchParams(this._url.searchParams.toString());
    }

    readonly toString = () => this._url.toString();

    private _url: URL;
}

export const openUrl = (targetUrl: string, isMiddleMouseClick: boolean = true) => {
    window.open(targetUrl, isMiddleMouseClick ? '_blank' : undefined);
};
