import { objectWithoutNull } from "../collections";
import { AnyNull } from "../types";
import { MutableStyles } from "./types";

export const setStyles = (element: HTMLElement | AnyNull, style: Partial<MutableStyles>) => {
    if(element == null) return element;

    Object.entries(objectWithoutNull(style)).forEach(([k, v]) => {
        element.style[k as any] = v;
    });

    return element;
}
