import { createCustomElement } from "../../utils/dom";
import { createQueue } from "../../utils/queue";
import { Classes, SNACKBAR_ID } from "./const";

type SnackbarData = {
    message: string;
    delay: number;
}

export const Snackbar = () => {
    const findSnackbar = () => document.getElementById(SNACKBAR_ID);

    const show = (message: string) => {
        console.log(message);
        const snackbar = findSnackbar()!;
        
        snackbar.textContent = message;
        snackbar.classList.add(Classes.showSnackbar);
    }

    const hide = () => {
        const snackbar = findSnackbar()!;

        snackbar.classList.remove(Classes.showSnackbar);
        snackbar.textContent = '';
    }

    const isShowsNow = () => findSnackbar()!.classList.contains(Classes.showSnackbar);

    const el = createCustomElement({
        tag: 'div',
        id: SNACKBAR_ID,    
    });

    const queue = createQueue<SnackbarData>();

    const showSnackbar = (message: string, delay: number) => {        
        if (isShowsNow()) return queue.push({message, delay});

        show(message);
        setTimeout(() => {
            hide();
            const next = queue.pop();

            if(next != null) showSnackbar(next.message, next.delay);
        }, delay);
    };

    return {
        ShackbarElement: el,
        showSnackbar,
    };
};
