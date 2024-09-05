import { onSingleVideoOpen } from "../../../handlers/onSingleVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";
import { PopupMenuItemChildren } from "./PopupMenuItemChildren";

export const ShowInSinglePopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: PopupMenuItemChildren({
        title: 'Открыть видео отдельно',
        iconPath: 'icons/playlist-icon.svg',
    }),    
    onClick: async (isMiddleMouseClick) => onSingleVideoOpen(isMiddleMouseClick),
    ...props,
});
