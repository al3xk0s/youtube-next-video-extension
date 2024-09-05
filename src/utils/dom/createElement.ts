import clsx = require("clsx");
import { filterObject } from "../collections";
import { setStyles } from "./styles";
import { equalsAnyOf } from "../operators";
import { DomElementCreateProps } from "./types";

export const createCustomElement = ({ tag, id, children, classList, style, attributes }: DomElementCreateProps = {}) => {
    const root = document.createElement(tag ?? 'div');

    if(attributes) {
        Object
            .entries(
                filterObject(Object.entries(attributes), (k, v) => !equalsAnyOf(k, ['id', 'class', 'style']))
            ).forEach(([k, v]) => root.setAttribute(k, v));
    }

    if(id) root.setAttribute('id', id);
    if(classList) root.setAttribute('class', clsx(classList));
    if(style) setStyles(root, style);    

    if(!children) return root;

    if(typeof children === 'string') {
        root.textContent = children;
        return root;
    }

    if(typeof children === 'object') {
        const arr = !Array.isArray(children) ? [children] : children;

        arr.forEach(e => root.insertAdjacentElement('beforeend', 'tagName' in e ? e : createCustomElement(e)))
        return root;
    }

    return root;
}
