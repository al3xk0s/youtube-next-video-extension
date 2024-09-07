import { objectWithoutNull } from "../collections";
import { AnyNull } from "../types";
import { MutableStyles } from "./types";

export const setStyles = (element: HTMLElement | AnyNull, style: Partial<MutableStyles>) => {
    if(element == null) return element;

    Object.entries(objectWithoutNull(style)).forEach(([k, v]) => {
        element.style[k as any] = v;
    });

    return element;
}

type CssRoundStrOptions = {
    roundingInterval?: string;
    strategy?: 'up' | 'down' | 'to-zero' | 'nearest';
}

export const cssRoundStr = (value: string, { roundingInterval = '1px', strategy }: CssRoundStrOptions = {}) => {
    const values = [strategy, value, roundingInterval].filter(v => v != null);

    return `round(${values.join(',')})`;
};

export const replaceClass = (element: HTMLElement | AnyNull, from: string, to: string) => {
    if(element == null) return;

    if(element.classList.contains(from)) return element.classList.replace(from, to);    
    element.classList.add(to);
}

/**
 * Ситуативный хак на грани идеотизма:
 * 
 * Дело в том, что браузер отказывается адекватно вопроизводить одни и те же кей фреймы подряд,
 * например, когда класс заменяется другим и оба воспроизводят одни и те же фреймы с разными параметрами анимации.
 * 
 * Поэтому вместо анимаций используют transition.
 * 
 * Но если сильно хочется, то можно написать костыль и использовать animation :)
 * 
 * Ниже оставил не очень рабочие способы для истории ;)
 */
export const copyCssAnimation = (newName: string, source: string) => {
    const FRAMES = '@keyframes';

    if(!source.includes(FRAMES)) throw new Error('Illegal source animation');

    const words = source.split(/\s+/).map(v => v.trim()).filter(v => v !== '');

    const keyFramesIndex = words.findIndex((v) => v === FRAMES);
    if(words.length < keyFramesIndex + 1) throw new Error('Animation source don\'t has animation name');

    words[keyFramesIndex + 1] = newName;

    return words.join(' ');
}

export const getDublicatedCssAnimation = (newName: string, source: string) => {
    return `
${source}

${copyCssAnimation(newName, source)}
    `;
};

/**
 * Вот эти способы, например, не сработали.
 * 
 * Ещё можно сделать класс со специальной анимацией для сброса и запускать её перед сменой на основной класс.
 * 
 * Не факт, что это сработает и это геморно.
 */
const triggerReflow = (element: HTMLElement | AnyNull) => element?.offsetHeight;

const resetCssAnimation = (element: HTMLElement | AnyNull) => {
    if(element == null) return;

    element.style.animation = 'none';
    triggerReflow(element);
    element.style.animation = '';
}
