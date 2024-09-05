import { AnyNull } from "./types";

export const force = <T>(value: T | AnyNull) => {
    if(value == null) throw new Error('Null operator used at null value');

    return value!;
};

export const equalsAnyOf = <T>(target: T, list: T[], comparer: (a: T, b: T) => boolean = (a, b) => a === b) => {
    for (const match of list) {
        if(comparer(match, target)) return true;
    }

    return false;
}
