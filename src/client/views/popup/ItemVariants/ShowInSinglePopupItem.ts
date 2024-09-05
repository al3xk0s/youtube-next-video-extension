import { onSingleVideoOpen } from "../../../handlers/onSingleVideoOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";

export const ShowInSinglePopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: 'Открыть видео отдельно',    
    onClick: async (isMiddleMouseClick) => onSingleVideoOpen(isMiddleMouseClick),
    ...props,
});
