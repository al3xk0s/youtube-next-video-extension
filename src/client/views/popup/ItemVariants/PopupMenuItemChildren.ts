import { useExtensionHref } from "../../../../utils/chromeAPI";
import { createCustomElement } from "../../../../utils/dom";

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
                width: '16px',
                height: '16px',
                margin: '0px 12px 0px 0px',
                padding: '0px',
                filter: 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(5712%) hue-rotate(269deg) brightness(104%) contrast(100%)',
                opacity: '0.65',
            }
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
