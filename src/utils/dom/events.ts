import { EventListenerDisposer, MouseEventListener } from "./types";

export const isMiddleMouseClick = (ev: Event) =>
    (ev as any).button === 1;

export const addMouseClickListener = (element: Element, listener: MouseEventListener) : EventListenerDisposer => {
    const onClick = (ev: MouseEvent) => {
        if(isMiddleMouseClick(ev))  ev.preventDefault();

        listener(ev, isMiddleMouseClick(ev));

        return false;
    };

    const onMouseDown = (ev: MouseEvent) => {
        if(isMiddleMouseClick(ev)) {
            ev.preventDefault();
            return false;
        }
    }

    element.addEventListener('mousedown', onMouseDown);   
    element.addEventListener('mouseup', onClick);

    return () => {
        element.removeEventListener('mouseup', onClick);
        element.removeEventListener('mousedown', onMouseDown);
    };
}
