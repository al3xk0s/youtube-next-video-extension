import { addMouseClickListener, createCustomElement, isMiddleMouseClick, PropsWithChildren, setStyles } from "../../../../utils/dom";
import { LockState } from "../../../utils/lockState";

export type PopupMenuStateItemProps = {
    lockState: LockState;
}

export type PopupMenuItemProps = PropsWithChildren & PopupMenuStateItemProps & {
    onClick?: (isMiddleMouseClick: boolean) => Promise<void>;
};

export const PopupMenuItem = ({ children, lockState, onClick }: PopupMenuItemProps) => {
    const el = createCustomElement({
        tag: 'div',
        classList: 'ytp-menuitem',
        children,
        style: {
            padding: '0px 16px',
        }
    });

    if(onClick == null) return el;

    lockState.listen((value) => {
        if(value) return setStyles(el, {
            cursor: 'not-allowed',
            opacity: '0.7',
            filter: 'grayscale(0.9)',
        });

        return setStyles(el, {
            cursor: 'pointer',
            opacity: '1',
            filter: 'inherit',
        })
    });

    addMouseClickListener(el, async (ev, isMiddleMouseClick) => {
        if(lockState.getValue()) return;

        lockState.lock();
        await onClick!(isMiddleMouseClick);
        lockState.unlock();
    });

    return el;
};
