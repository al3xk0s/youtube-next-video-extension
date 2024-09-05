import { createCustomElement, setStyles } from "../../../utils/dom";
import { Classes } from "../const";
import { PopupMenuID } from "./const";

export const PopupMenuButton = () => {
    const findButton = () => document.getElementById(PopupMenuID.button);

    const onLock = () => findButton()?.classList.add(Classes.locked);
    const onUnlock = () => findButton()?.classList.remove(Classes.locked);

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
