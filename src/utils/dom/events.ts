import { EventListenerDisposer, MouseEventListener } from "./types";

export const isMiddleMouseClick = (ev: Event) =>
    (ev as any).button === 1;

export const addMouseClickListener = (element: Element, listener: MouseEventListener) : EventListenerDisposer => {
    const onClick = (ev: MouseEvent) => listener(ev, isMiddleMouseClick(ev));
    
    element.addEventListener('mouseup', onClick);
    return () => element.removeEventListener('mouseup', onClick);
}
