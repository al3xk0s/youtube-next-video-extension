export const countStarting = <T>(array: T[], isTarget: (value: T) => boolean) => {
    let isCounting = false;

    let counter = 0;
    for (const value of array) {
        if(!isCounting) {
            isCounting = isTarget(value);
        }

        if(!isCounting) continue;

        counter++;
    }

    return counter;
}

export const filterObject = <V = any>(obj: { [k: string]: V }, predicate: (key: string | number | symbol, value: V) => boolean) =>
    Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => predicate(k, v))
    );

export const mapObject = <V = any, M = any>(obj: { [k: string]: V }, mapper: (key: string | number | symbol, value: V) => [ string | number | symbol, M ]) =>
    Object.fromEntries(
        Object.entries(obj).map(([k, v]) => mapper(k, v))
    );
