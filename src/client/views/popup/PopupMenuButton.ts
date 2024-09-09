import { createDebouncer } from "../../../utils/async";
import { useExtensionHref } from "../../../utils/chromeAPI";
import { createCustomElement, replaceClass } from "../../../utils/dom";
import { Classes } from "../const";
import { PopupMenuID } from "./const";
import { iconStyles, PopupMenuButtonStyles } from "./styles";

export const PopupMenuButton = () => {
    const transitionDuration = 150;
    const transitionDelay = 200;

    const findButton = () => document.getElementById(PopupMenuID.button);
    const setDeactivateClass = () => replaceClass(findButton(), Classes.buttonImageActive, Classes.buttonImageInactive);

    const revertAnimation = createDebouncer({ delayMs: (transitionDuration + transitionDelay) * 4, executor: setDeactivateClass });

    const onDeactivate = () => {
        revertAnimation.tryCancel();
        setDeactivateClass();
    }

    const onActivate = () => {
        replaceClass(findButton(), Classes.buttonImageInactive, Classes.buttonImageActive);
        revertAnimation.exec();
    }

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
                    transitionDuration: `${transitionDuration}ms`,
                    transitionDelay: `${transitionDelay}ms`,
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
