import { createCustomElement } from "../../utils/dom";
import { Classes, SNACKBAR_ID } from "./const";
import { PopupMenuID } from "./popup/const";

export const Styles = () => createCustomElement({
    tag: 'style',
    children: `
    
.${Classes.locked} {
    animation:  bounce 2s ease-in-out alternate infinite;
    transform-origin: center bottom;
    cursor: 'wait';
}

@keyframes bounce {
    0%,
    25% {
        scale: 1 100%;
    }

    50%,
    75%,
    100% {
        scale: 120% 75%;
    }
}

#${SNACKBAR_ID} {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}

#${SNACKBAR_ID}.${Classes.showSnackbar} {
    visibility: visible;
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
}

#${PopupMenuID.menu}, #${SNACKBAR_ID} {
    font-size: 100%;
    font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
    font-weight: 500;
}

@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}
    `,
});
