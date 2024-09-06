import { useExtensionHref } from "../../../utils/chromeAPI";
import { createCustomElement, cssRoundStr } from "../../../utils/dom";
import { Classes } from "../const";
import { PopupMenuID } from "./const";
import { iconStyles, PopupMenuButtonStyles } from "./styles";

export const PopupMenuButton = () => {
    const findButton = () => document.getElementById(PopupMenuID.button);    

    const onActivate = () => findButton()?.classList.add(Classes.buttonImageActive);
    const onDeactivate = () => findButton()?.classList.remove(Classes.buttonImageActive);

    const onLock = () => {
        onDeactivate();
        findButton()?.classList.add(Classes.locked);
    }

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
            userSelect: 'none',
        },
        children: [
            createCustomElement({
                tag: "img",
                style: {
                    ...iconStyles,
                    height: PopupMenuButtonStyles.size,
                    width: PopupMenuButtonStyles.size,
                    pointerEvents: 'none',
                    transitionDuration: '250ms',
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
        onActivate,
        onDeactivate,
    };
};
