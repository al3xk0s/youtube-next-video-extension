export interface Queue<T> {
    pop() : T | undefined;
    push(value: T) : void;

    toArray() : T[];
}

export const createQueue = <T>(initial: T[] = []) : Queue<T> => {
    let values = initial.slice();

    const pop = () => {
        if(values.length === 0) return;

        const value = values[0];
        values = values.slice(1);

        return value;
    }

    const push = (value: T) => {
        values.push(value);
    }

    const toArray = () => values.slice();

    return {
        pop,
        push,
        toArray,
    }
}
