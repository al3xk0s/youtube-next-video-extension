export type StateListener<T> = (value: T) => void;

export const createState = <T>(initial: T, initialListener?: StateListener<T>) => {
    let _value = initial;
    let subs: StateListener<T>[] = [];

    const listen = (listener: StateListener<T>) => subs.push(listener);
    const notify = (value: T) => subs.forEach(l => l(value));

    const setValue = (newValue: T) => {
        _value = newValue;
        notify(_value);        
    }

    const getValue = () => _value;
    const dispose = () => { subs = []; };

    if(initialListener != null) {
        listen(initialListener);
    }

    return {
        setValue,
        getValue,
        listen,
        dispose,
    }
}

