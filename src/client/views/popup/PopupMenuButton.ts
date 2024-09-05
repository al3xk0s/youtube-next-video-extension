import { useExtensionHref } from "../../../utils/chromeAPI";
import { createCustomElement } from "../../../utils/dom";
import { Classes } from "../const";
import { PopupMenuID } from "./const";
import { iconStyles } from "./styles";

export const PopupMenuButton = () => {
    const findButton = () => document.getElementById(PopupMenuID.button);

    const onLock = () => findButton()?.classList.add(Classes.locked);
    const onUnlock = () => findButton()?.classList.remove(Classes.locked);

    const element = createCustomElement({
        tag: 'div',
        id: PopupMenuID.button,
        style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        },
        children: [
            createCustomElement({
                tag: "img",
                style: {
                    ...iconStyles,                
                    height: '52%',
                    width: '52%',
                    opacity: '0.89',
                    pointerEvents: 'none',
                },
                attributes: {
                    src: useExtensionHref('icons/you.svg'),
                }
            }),
            createCustomElement({
                style: {
                    width: '21%',
                }
            })
        ]
    })

    return {
        PopupButton: element,
        onLock,
        onUnlock,
    };
};
