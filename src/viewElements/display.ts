import { macrotaskWrap, macrotask } from "../lib/async";
import { setStyles } from "../lib/style";
import { ImmutableStyles } from "../lib/style";

export const $display = (() => {
    const el = document.querySelector('#text-display')!;
    const body = document.querySelector('body')!;
    const html = document.querySelector('html')!;

    const content = document.querySelector('.content')! as HTMLElement;

    const createStyles = (element: HTMLElement) => ({
        height: `${Math.round(element.offsetHeight)}px`,
        width: `${Math.round(element.offsetWidth)}px`,
    } as ImmutableStyles);

    const setText = (value: string) => {
        el.textContent = value.trim();



        macrotask(() => {
            setStyles(body, createStyles(content));
            setStyles(html, createStyles(body));
        })
    };

    const setVariant = (variant: string) => {
        el.classList.remove(
            ...Array.from(el.classList.entries())
                .map(([k, v]) => v)
                .filter(v => v.includes('display-text')
            )
        );
        el.classList.add(variant);
    }

    const text = macrotaskWrap((value: string) => {        
        setText(value);
        setVariant('display-text');
    });

    const error = macrotaskWrap((value: string) => {
        setText(value);
        setVariant('display-text-error');
    })

    const initial = () => text('Previous, on playlist or next video');

    return {
        text,
        error,
        initial,
    }
})()
