import { onVideosPlaylistOpen } from "../../../handlers/onVideosPlaylistOpen";
import { PopupMenuItem, PopupMenuStateItemProps } from "./PopupMenuItem";
import { PopupMenuItemChildren } from "./PopupMenuItemChildren";

export const ShowInVideosPopupItem = (props : PopupMenuStateItemProps) => PopupMenuItem({
    children: PopupMenuItemChildren({
        title: 'Открыть во всех видео',
        iconPath: 'icons/playlist-icon.svg',
    }),
    onClick: (isMiddleMouseClick) => onVideosPlaylistOpen(isMiddleMouseClick),
    ...props,
});
