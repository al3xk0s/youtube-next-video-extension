import { createCustomElement, setStyles } from "../../../utils/dom";
import { PopupMenuID } from "./const";

export const PopupMenuButton = () => {
    const findButton = () => document.getElementById(PopupMenuID.button);

    const onLock = () => {
        const el = findButton();

        setStyles(el, {
            cursor: 'not-allowed',
            opacity: '0.7',
            filter: 'grayscale(0.9)',
        });
    }


    const onUnlock = () => {
        const el = findButton();
        
        return setStyles(el, {
            cursor: 'pointer',
            opacity: '1',
            filter: 'inherit',
        });
    }

    const element = createCustomElement({
        tag: "div",
        id: PopupMenuID.button,
        style: {
            color: 'white',
            margin: 'auto',
            textAlign: 'center',
            padding: '0px',
        },
        children: 'ex',
    });

    return {
        PopupButton: element,
        onLock,
        onUnlock,
    };
};
