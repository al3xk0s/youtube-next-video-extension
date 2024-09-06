import { cssRoundStr, MutableStyles } from "../../../utils/dom";

export const PopupMenuButtonStyles = {
    size: cssRoundStr('52%'),
    activeSize: cssRoundStr('60%'),
    activeXInset: cssRoundStr('-14%'),
    activeYInset: cssRoundStr('-12%'),
    finalActiveYInset: cssRoundStr('0%'),
}


export const iconStyles : Partial<MutableStyles> = {
    filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7486%) hue-rotate(242deg) brightness(109%) contrast(99%)',
    opacity: '0.9',
};
