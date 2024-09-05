import { createCustomElement, DomChildren, setStyles } from "../../../utils/dom";
import { LockState } from "../../utils/lockState";
import { PopupMenuID } from "./const";

const createItemsList = (lockState: LockState) : DomChildren => {
    const result = [
        createCustomElement({
            tag: 'div',
            classList: 'ytp-menuitem',
            children: 'some',
            style: {
                padding: '0px 16px',
            }
        }),
        createCustomElement({
            tag: 'div',
            classList: 'ytp-menuitem',
            children: 'one',
            style: {
                padding: '0px 16px',
            }
        }),
        createCustomElement({
            tag: 'div',
            classList: 'ytp-menuitem',
            children: 'one',
            style: {
                padding: '0px 16px',
            }
        }),
    ]

    return result;
}

export const PopupMenuItems = ({initialShows = false}: { initialShows?: boolean} = {}) => {
    const SHOW_DISPLAY = 'flex';
    const HIDE_DISPLAY = 'none';

    const findItems = () => document.getElementById(PopupMenuID.items);
    const isShowsItems = () => findItems()?.style.display !== HIDE_DISPLAY;

    const showItems = () => setStyles(findItems(), { display: SHOW_DISPLAY });
    const hideItems = () => setStyles(findItems(), { display: HIDE_DISPLAY });

    // TODO: implements lock / unlock items
    const lockItemButtons = () => {}
    const unlockItemButtons = () => {};

    const element = createCustomElement({
        id: PopupMenuID.items,
        classList: 'ytp-popup ytp-settings-menu',
        style: {
            display: initialShows ? SHOW_DISPLAY : HIDE_DISPLAY,
            flexDirection: 'column',
            padding: '12px 0px',
            minWidth: '35%',
        },
        children: createItemsList(),
    });

    return {
        Items: element,
        findItems,
        isShowsItems,
        showItems,
        hideItems,
        lockItemButtons,
        unlockItemButtons,
    };
};
