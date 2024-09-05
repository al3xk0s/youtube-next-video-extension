import { useExtensionHref } from "../../../../utils/chromeAPI";
import { createCustomElement } from "../../../../utils/dom";
import { iconStyles } from "../styles";

type PopupMenuItemChildrenProps = {
    title: string;
    iconPath: string;
}

export const PopupMenuItemChildren = ({ title, iconPath }: PopupMenuItemChildrenProps) => createCustomElement({
    tag: 'div',
    style: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    children: [
        createCustomElement({
            tag: 'img',
            attributes: {
                src: useExtensionHref(iconPath)
            },
            classList: 'ytp-menuitem-icon',
            style: {
                ...iconStyles,
                margin: '0px 12px 0px 0px',
                padding: '0px',
            },
        }),
        createCustomElement({
            tag: 'div',
            children: title,
            style: {                
                padding: '0px',
                lineHeight: '14px',
            }
        })
    ]
});
