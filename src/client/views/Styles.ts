import { createCustomElement } from "../../utils/dom";
import { Classes, SNACKBAR_ID } from "./const";
import { PopupMenuID } from "./popup/const";

export const Styles = () => createCustomElement({
    tag: 'style',
    children: `
    
.${Classes.locked} {
    -webkit-animation: spin 2s ease-in infinite;
    animation: spin 2s ease-in infinite;
    cursor: 'wait';
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  50% { -webkit-transform: rotate(180deg); }
  75% { -webkit-transform: rotate(180deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
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
