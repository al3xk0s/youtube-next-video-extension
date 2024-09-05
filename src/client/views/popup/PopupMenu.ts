import { createCustomElement, setStyles } from "../../../utils/dom";
import { PopupMenuID } from "./const";
import { PopupMenuButton } from "./PopupMenuButton";
import { PopupMenuItems } from "./PopupMenuItems";

type PopupMenuProps = {
    initialShows?: boolean;
}

export const PopupMenu = ({
    initialShows = false,
}: PopupMenuProps = {}) => {
    const {Items, isShowsItems, showItems, hideItems, lockItemButtons, unlockItemButtons } = PopupMenuItems({initialShows});

    const menu = createCustomElement({
        tag: 'div',
        classList: 'ytp-button',
        id: PopupMenuID.menu,
        style: {
            fontSize: '14px',
            fontFamily: '"YouTube Noto", Roboto, Arial, Helvetica, sans-serif',
        },
        children: [
            PopupMenuButton(),
            Items,
        ],
    });

    menu.addEventListener('click', (ev) => {        
        if((ev.target as HTMLElement).getAttribute('id') !== PopupMenuID.button) return;
        
        if(isShowsItems()) return hideItems();
        return showItems();
    });

    return menu;
};
