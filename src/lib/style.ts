import { objectWithoutNull } from "./collections";

export type ImmutableStyles = Omit<
    CSSStyleDeclaration,
    'getPropertyPriority' |
    'getPropertyValue' |
    'item' |
    'removeProperty' |
    'setProperty' |
    'length' |
    'parentRule'
>;

export const setStyles = (element: HTMLElement, style: Partial<ImmutableStyles>) => {
    Object.entries(objectWithoutNull(style)).forEach(([k, v]) => {
        element.style[k as any] = v;
    });
}
