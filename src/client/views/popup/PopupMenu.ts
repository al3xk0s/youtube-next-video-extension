import { createCustomElement, setStyles } from "../../../utils/dom";
import { createLockState } from "../../utils/lockState";
import { PopupMenuID } from "./const";
import { PopupMenuButton } from "./PopupMenuButton";
import { PopupMenuItems } from "./PopupMenuItems";

type PopupMenuProps = {
    initialShows?: boolean;
}

export const PopupMenu = ({
    initialShows = false,
}: PopupMenuProps = {}) => {
    const lockState = createLockState();

    const { Items, isShowsItems, showItems, hideItems } = PopupMenuItems({initialShows, lockState});

    const { PopupButton, onLock: buttonOnLock, onUnlock: buttonOnUnlock } = PopupMenuButton();
    
    // TODO: проще не давать открыть меню :)

    const menu = createCustomElement({
        tag: 'div',
        classList: 'ytp-button',
        id: PopupMenuID.menu,
        style: {
            fontSize: '14px',
            fontFamily: '"YouTube Noto", Roboto, Arial, Helvetica, sans-serif',
        },
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

    menu.addEventListener('click', (ev) => {        
        if((ev.target as HTMLElement).getAttribute('id') !== PopupMenuID.button) return;
        if(lockState.getValue()) return;

        if(isShowsItems()) return hideItems();
        return showItems();
    });

    lockState.listen((isLocked) => {
        if (!isLocked) return onLocked();

        return onUnlocked();
    });

    return menu;
};
