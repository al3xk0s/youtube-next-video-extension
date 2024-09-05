import { createCustomElement } from "../../../utils/dom";
import { PopupMenuID } from "./const";

export const PopupMenuButton = () => createCustomElement({
    tag: "div",
    id: PopupMenuID.button,
    style: {
        color: 'white',
        margin: 'auto',
        textAlign: 'center',
        padding: '0px',
    },
    children: 'ex',
});
