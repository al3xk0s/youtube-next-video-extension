import { AnyNull } from "./types";

export const force = <T>(value: T | AnyNull) => {
    if(value == null) throw new Error('Null operator used at null value');

    return value!;
};
