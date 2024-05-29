export const macrotask = (exec: () => void) => 
    setTimeout(exec, 0);

export const macrotaskWrap = <F extends (...p: Parameters<F>) => ReturnType<F>>(exec: F) => 
    (...p: Parameters<F>) => {
        macrotask(() => exec(...p));
    }
