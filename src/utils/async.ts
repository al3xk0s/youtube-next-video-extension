export const macrotask = (exec: () => void) => 
    setTimeout(exec, 0);

export const macrotaskWrap = <F extends (...p: Parameters<F>) => ReturnType<F>>(exec: F) => 
    (...p: Parameters<F>) => {
        macrotask(() => exec(...p));
    }

export const microtask = <T>(exec: () => T) => new Promise<T>((res) => {
    res(exec());
})

interface DelayedCallable {
    (delayMs: number) : Promise<void>;
    <T>(delayMs: number, exec: () => T) : Promise<T>;
}

export const delayed : DelayedCallable = <T>(delayMs: number, exec?: () => T) => new Promise<T>((res) => {
    setTimeout(() => {
        if(exec != null) return res(exec());
        res(null as T);
    }, delayMs);
});

type DebouncerProps = {
    delayMs?: number;
    executor?: () => void;
};

export const createDebouncer = ({ delayMs: defaultDelayMs, executor: defaultExecutor }: DebouncerProps = {}) => {
    let pid: any;

    const tryCancel = () => {
        if(pid == null) return;

        clearTimeout(pid);
        pid = null;
    }

    const exec = ({ delayMs = defaultDelayMs, executor = defaultExecutor }: DebouncerProps = {}) => {        
        if(delayMs == null || executor == null) throw new Error('Debounce error: delay or executor is null');

        tryCancel();

        pid = setTimeout(() => executor(), delayMs);
    };

    return {
        exec,
        tryCancel,
    }
};
