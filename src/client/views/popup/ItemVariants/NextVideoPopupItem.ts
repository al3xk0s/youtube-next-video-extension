import { AdjacentVideoType } from "../../../../models/Message";
import { onAdjacentVideoOpen } from "../../../handlers/onAdjacentVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";
import { PopupMenuItemChildren } from "./PopupMenuItemChildren";

export const NextVideoPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: PopupMenuItemChildren({
        title: 'Следующее видео',
        iconPath: 'icons/fast-forward-red-icon.svg',
    }),
    onClick: (isMiddleMouseClick) => onAdjacentVideoOpen(AdjacentVideoType.next, isMiddleMouseClick),
    ...props
});
