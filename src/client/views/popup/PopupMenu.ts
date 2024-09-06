import { createCustomElement } from "../../../utils/dom";
import { AnyNull } from "../../../utils/types";
import { createLockState } from "../../utils/lockState";
import { PopupMenuID } from "./const";
import { PopupMenuButton } from "./PopupMenuButton";
import { PopupMenuItems } from "./PopupMenuItems";

type PopupMenuProps = {
    showMessage: (message: string, delay: number) => void;
}

export const PopupMenu = ({
    showMessage,
}: PopupMenuProps) => {
    const lockState = createLockState();
    const snackbarDelay = 5000;
    
    const onError = (userMessage: string) => showMessage(userMessage, snackbarDelay);

    const { Items, isShowsItems, showItems, hideItems, activeMenuState } = PopupMenuItems({lockState, onError});

    const { PopupButton, onLock: buttonOnLock, onUnlock: buttonOnUnlock, onActivate, onDeactivate } = PopupMenuButton();
    
    const menu = createCustomElement({
        tag: 'div',
        classList: 'ytp-button',
        id: PopupMenuID.menu,
        children: [
            PopupButton,
            Items,
        ],
    });

    const onLocked = () => {
        hideItems();
        buttonOnLock();
    }

    const onUnlocked = () => {
        buttonOnUnlock();
    }

    const isMenuArea = (id: string | AnyNull) =>
        id != null && [PopupMenuID.button, PopupMenuID.items, PopupMenuID.menu].includes(id);

    menu.addEventListener('click', (ev) => {
        if((ev.target as HTMLElement).getAttribute('id') === PopupMenuID.items) return;
        if(lockState.getValue()) return;

        if(isShowsItems()) return hideItems();
        return showItems();
    });

    window.addEventListener('click', (ev) => {
        if(isMenuArea((ev.target as HTMLElement).id)) return;

        if(isShowsItems()) return hideItems();
    })

    lockState.listen((isLocked) => {
        if (isLocked) return onLocked();

        return onUnlocked();
    });

    activeMenuState.listen((isActive) => {
        if(isActive) return onActivate();
        return onDeactivate();
    });

    return menu;
};
