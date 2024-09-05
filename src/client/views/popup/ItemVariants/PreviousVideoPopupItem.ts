import { AdjacentVideoType } from "../../../../models/Message";
import { onAdjacentVideoOpen } from "../../../handlers/onAdjacentVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem"
import { PopupMenuItemChildren } from "./PopupMenuItemChildren";

export const PreviousVideoPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: PopupMenuItemChildren({
        title: 'Предыдущее видео',
        iconPath: 'icons/backward-red-icon.svg',
    }),
    onClick: (isMiddleMouseClick) => onAdjacentVideoOpen(AdjacentVideoType.previos, isMiddleMouseClick),
    ...props,
});
