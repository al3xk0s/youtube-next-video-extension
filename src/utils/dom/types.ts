import { ClassValue } from "clsx";
import { AnyNull, OmitMapped } from "../types";

export type MutableStyles = Omit<
    CSSStyleDeclaration,
    'getPropertyPriority' |
    'getPropertyValue' |
    'item' |
    'removeProperty' |
    'setProperty' |
    'length' |
    'parentRule'
>;

export type DomChildren = string | DomElementCreateProps | HTMLElement | AnyNull | (string | DomElementCreateProps | HTMLElement | AnyNull)[];

export type PropsWithChildren = {
    children?: DomChildren;
}

export type DomElementAttributes = {
    id?: string;
    attributes?: OmitMapped<Record<string, string>, 'class' | 'id' | 'style'>;
    classList?: ClassValue;    
    style?: Partial<MutableStyles>;
}

export type DomElementCreateProps = PropsWithChildren & DomElementAttributes & {
    tag?: keyof HTMLElementTagNameMap;
}

export type MouseEventListener = (ev: MouseEvent, isMiddleClicked: boolean) => void;
export type EventListenerDisposer = () => void;
