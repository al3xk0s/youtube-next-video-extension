import { onSingleVideoOpen } from "../../../handlers/onSingleVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";

export const ShowInSinglePopupItem = ({lockState}: PopupMenuStateItemProps) => PopupMenuItem({
    children: 'Одиночный просмотр',
    onClick: async (isMiddleMouseClick) => onSingleVideoOpen(isMiddleMouseClick),
    lockState,
});