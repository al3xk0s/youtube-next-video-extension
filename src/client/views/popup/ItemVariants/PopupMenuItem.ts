import { BackendExtensionResponse } from "../../../../models/Message";
import { addMouseClickListener, createCustomElement, PropsWithChildren } from "../../../../utils/dom";
import { LockState } from "../../../utils/lockState";

export type PopupMenuStateItemProps = {
    lockState: LockState;
    onError: (userMessage: string) => void;
}

export type PopupMenuItemProps = PropsWithChildren & PopupMenuStateItemProps & {
    onClick?: (isMiddleMouseClick: boolean) => Promise<BackendExtensionResponse<any>>;
};

export const PopupMenuItem = ({ children, lockState, onClick, onError }: PopupMenuItemProps) => {
    const el = createCustomElement({
        tag: 'div',
        classList: 'ytp-menuitem',
        children,
        style: {
            padding: '0px 16px',
        }
    });

    if(onClick == null) return el;

    addMouseClickListener(el, async (ev, isMiddleMouseClick) => {        
        if(lockState.getValue()) return;

        try {
            lockState.lock();
            const res = await onClick!(isMiddleMouseClick);

            if(res.isError) onError(res.userMessage!);
            return lockState.unlock();
        } catch(e) {
            onError(e);
            lockState.unlock();
        }
    });

    return el;
};
