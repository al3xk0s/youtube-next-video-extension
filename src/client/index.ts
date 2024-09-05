console.log('hello')

import { PopupMenu } from "./views/popup/PopupMenu";
import { Snackbar } from "./views/Snackbar";
import { Styles } from "./views/Styles";

const { ShackbarElement, showSnackbar } = Snackbar();
const menu = PopupMenu({ showMessage: showSnackbar });
const styles = Styles();

const registerElement = (element: Element, selector: string, position: InsertPosition) => {
    const interval = 100;

    const i = setInterval(() => {
        const target = document.querySelector(selector);

        if(target == null) return;
        target.insertAdjacentElement(position, element);

        clearInterval(i);
        console.log('registred');
    }, interval);
}

const LATER_REGISTER_DELAY = 1500;

registerElement(menu, '.ytp-right-controls', 'afterbegin');
registerElement(styles, 'head', 'beforeend');

setTimeout(() => {
    registerElement(ShackbarElement, 'body', 'beforeend');
}, LATER_REGISTER_DELAY);
