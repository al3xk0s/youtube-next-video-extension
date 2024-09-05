import { onVideosPlaylistOpen } from "../../../handlers/onVideosPlaylistOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";

export const ShowInVideosPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: 'Открыть в плейлисте',    
    onClick: (isMiddleMouseClick) => onVideosPlaylistOpen(isMiddleMouseClick),
    ...props,
});
