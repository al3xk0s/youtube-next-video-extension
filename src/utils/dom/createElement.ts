import { filterObject } from "../collections";
import { setStyles } from "./styles";
import { equalsAnyOf } from "../operators";
import { DomChildren, DomElementCreateProps } from "./types";
import { clsx } from "clsx";

const placeRootChildren = (root: HTMLElement, children: DomChildren) => {
    if(typeof children === 'string') {
        root.appendChild(document.createTextNode(children));
        return root;
    }

    if(typeof children === 'object') {
        const arr = !Array.isArray(children) ? [children] : children;

        arr.forEach(e => {
            if(e == null) return;

            if(typeof e === 'string') return root.appendChild(document.createTextNode(e));
            const element = 'tagName' in e ? e : createCustomElement(e);

            root.insertAdjacentElement('beforeend', element);
        })

        return root;
    }

    return root;
}

export const placeCustomElement = (root: HTMLElement, { id, children, classList, style, attributes }: Omit<DomElementCreateProps, 'tag'> = {}) => {
    if(attributes) {
        Object
            .entries(
                filterObject(attributes, (k) => !equalsAnyOf(k, ['id', 'class', 'style']))
            ).forEach(([k, v]) => root.setAttribute(k, v));
    }

    if(id) root.setAttribute('id', id);
    if(classList) root.setAttribute('class', clsx(classList));
    if(style) setStyles(root, style);    

    if(!children) return root;

    return placeRootChildren(root, children);
}

export const createCustomElement = ({ tag, ...props }: DomElementCreateProps = {}) => {
    const root = document.createElement(tag ?? 'div');

    return placeCustomElement(root, props);
}
