import { AdjacentVideoType } from "../../../../models/Message";
import { onAdjacentVideoOpen } from "../../../handlers/onAdjacentVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";

export const NextVideoPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: 'Следующее видео',
    onClick: (isMiddleMouseClick) => onAdjacentVideoOpen(AdjacentVideoType.next, isMiddleMouseClick),
    ...props
});
