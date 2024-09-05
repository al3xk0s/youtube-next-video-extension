import { AdjacentVideoType } from "../../../../models/Message";
import { onAdjacentVideoOpen } from "../../../handlers/onAdjacentVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem"

export const PreviousVideoPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: 'Предыдущее видео',
    onClick: (isMiddleMouseClick) => onAdjacentVideoOpen(AdjacentVideoType.previos, isMiddleMouseClick),
    ...props,
});
