import { createCustomElement, getDublicatedCssAnimation } from "../../utils/dom";
import { Classes, SNACKBAR_ID } from "./const";
import { PopupMenuID } from "./popup/const";

export const Styles = () => createCustomElement({
    tag: 'style',
    children: `

.${Classes.buttonImageActive} > img {    
        transform-origin: center;
        animation: spin 300ms ease-in-out 200ms forwards;
    }

.${Classes.buttonImageInactive} > img {            
        transform-origin: center;
        animation: spin-reverse 300ms ease-in-out 200ms reverse forwards;
    }

${getDublicatedCssAnimation('spin-reverse', 
    `
    @keyframes spin {            
    0% {                
        transform: rotate(0deg);
    }
    50% {
        scale: 50% 50%;
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
    `
)}

.${Classes.locked} > img {
    animation: bounce 1500ms ease-in-out infinite, jump 1500ms ease-in-out infinite;
    transform-origin: center bottom;
    cursor: 'wait';
}
@keyframes bounce {
    0%, 5%, 100% {
        scale: 100% 100%;
    }
    25% {
        scale: 125% 75%; /* Сжатие */
    }
    50%, 60% {
        scale: 75% 110%; /* Разжатие */
    }
    85%, 87% {
        scale: 122% 78%; /* Сжатие */
    }
}

@keyframes jump {
    0%, 75%, 92%, 100% {
        transform: translateY(0px);
    }
    25%, 85% {
        transform: translateY(1px);
    }
    50% {
        transform: translateY(-8px);
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
