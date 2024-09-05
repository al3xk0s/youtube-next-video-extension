import { createCustomElement, setStyles } from "../../../utils/dom";
import { createLockState } from "../../utils/lockState";
import { PopupMenuID } from "./const";
import { PopupMenuButton } from "./PopupMenuButton";
import { PopupMenuItems } from "./PopupMenuItems";

type PopupMenuProps = {
    initialShows?: boolean;
    showMessage: (message: string, delay: number) => void;
}

export const PopupMenu = ({
    initialShows = false,
    showMessage,
}: PopupMenuProps) => {
    const lockState = createLockState();
    const snackbarDelay = 5000;
    
    const onError = (userMessage: string) => showMessage(userMessage, snackbarDelay);

    const { Items, isShowsItems, showItems, hideItems } = PopupMenuItems({initialShows, lockState, onError});

    const { PopupButton, onLock: buttonOnLock, onUnlock: buttonOnUnlock } = PopupMenuButton();
    
    // TODO: проще не давать открыть меню :)

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

    menu.addEventListener('click', (ev) => {        
        if((ev.target as HTMLElement).getAttribute('id') !== PopupMenuID.button) return;
        if(lockState.getValue()) return;

        if(isShowsItems()) return hideItems();
        return showItems();
    });

    window.addEventListener('click', (ev) => {
        if([PopupMenuID.button, PopupMenuID.items, PopupMenuID.menu].includes((ev.target as HTMLElement)?.getAttribute('id') || 'asfaf')) return;

        if(isShowsItems()) return hideItems();
    })

    lockState.listen((isLocked) => {
        if (isLocked) return onLocked();

        return onUnlocked();
    });

    return menu;
};
