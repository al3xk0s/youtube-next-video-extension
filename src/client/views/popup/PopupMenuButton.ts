import { useExtensionHref } from "../../../utils/chromeAPI";
import { createCustomElement, cssRoundStr, replaceClass } from "../../../utils/dom";
import { Classes } from "../const";
import { PopupMenuID } from "./const";
import { iconStyles, PopupMenuButtonStyles } from "./styles";

export const PopupMenuButton = () => {
    const findButton = () => document.getElementById(PopupMenuID.button);    

    const onActivate = () => replaceClass(findButton(), Classes.buttonImageInactive, Classes.buttonImageActive);
    const onDeactivate = () => replaceClass(findButton(), Classes.buttonImageActive, Classes.buttonImageInactive);

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
                    transitionDuration: '225ms',
                    transitionDelay: '100ms',
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
