console.log('hello')

import { PopupMenu } from "./views/popup/PopupMenu";

const menu = PopupMenu();

const registerExtensionContent = () => {
    const interval = 100;

    const i = setInterval(() => {
        const target = document.querySelector(".ytp-right-controls");

        if(target == null) return;
        target.insertAdjacentElement('afterbegin', menu);

        clearInterval(i);
        console.log('registred');
    }, interval);
}

registerExtensionContent();
