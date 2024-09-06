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

type CssRoundStrOptions = {
    roundingInterval?: string;
    strategy?: 'up' | 'down' | 'to-zero' | 'nearest';
}

export const cssRoundStr = (value: string, { roundingInterval = '1px', strategy }: CssRoundStrOptions = {}) => {
    const values = [strategy, value, roundingInterval].filter(v => v != null);

    return `round(${values.join(',')})`;
};
