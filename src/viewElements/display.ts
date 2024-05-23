export const $display = (() => {
    const el = document.querySelector('#text-display');

    const setText = (value: string) => el.textContent = value.trim();
    const setVariant = (variant: string) => {
        el.classList.remove(
            ...Array.from(el.classList.entries())
                .map(([k, v]) => v)
                .filter(v => v.includes('display-text')
            )
        );
        el.classList.add(variant);
    }

    const text = (value: string) => {
        setText(value);
        setVariant('display-text');
    };

    const error = (value: string) => {
        setText(value);
        setVariant('display-text-error');
    }

    const initial = () => text('Previous or next video')

    return {
        text,
        error,
        initial,
    }
})()
