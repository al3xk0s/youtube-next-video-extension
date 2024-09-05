import { createCustomElement, DomChildren, setStyles } from "../../../utils/dom";
import { isPlaylist } from "../../../utils/youtube";
import { LockState } from "../../utils/lockState";
import { PopupMenuID } from "./const";
import { NextVideoPopupItem } from "./ItemVariants/NextVideoPopupItem";
import { PreviousVideoPopupItem } from "./ItemVariants/PreviousVideoPopupItem";
import { ShowInSinglePopupItem } from "./ItemVariants/ShowInSinglePopupItem";
import { ShowInVideosPopupItem } from "./ItemVariants/ShowInVideosPopupItem";

const createItemsList = (lockState: LockState, onError: (userMessage: string) => void) : DomChildren => [
    NextVideoPopupItem({lockState, onError}),
    PreviousVideoPopupItem({lockState, onError}),
    isPlaylist()
        ? ShowInSinglePopupItem({lockState, onError})
        : ShowInVideosPopupItem({lockState, onError}),
];

type PopupMenuItemsProps = {
    initialShows?: boolean;
    lockState: LockState;
    onError: (userMessage: string) => void;
}

export const PopupMenuItems = ({initialShows = false, lockState, onError } : PopupMenuItemsProps) => {
    const SHOW_DISPLAY = 'flex';
    const HIDE_DISPLAY = 'none';

    const findItems = () => document.getElementById(PopupMenuID.items);
    const isShowsItems = () => findItems()?.style.display !== HIDE_DISPLAY;

    const showItems = () => setStyles(findItems(), { display: SHOW_DISPLAY });
    const hideItems = () => setStyles(findItems(), { display: HIDE_DISPLAY });

    const element = createCustomElement({
        id: PopupMenuID.items,
        classList: 'ytp-popup ytp-settings-menu',
        style: {
            display: initialShows ? SHOW_DISPLAY : HIDE_DISPLAY,
            flexDirection: 'column',
            padding: '12px 0px',
            minWidth: '35%',
        },
        children: createItemsList(lockState, onError),
    });

    return {
        Items: element,
        findItems,
        isShowsItems,
        showItems,
        hideItems,
    };
};
