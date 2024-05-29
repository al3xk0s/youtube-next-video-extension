import { filterObject, mapObject, objectWithoutNull } from "./collections";

export const createUrl = (base: string, { query }: { query?: ConstructorParameters<typeof URLSearchParams>[0] } = {}) =>
    query == null
        ? base
        : base + '?' + new URLSearchParams(query).toString();

export const createQuery = (record: Record<string, any>, { removeNulls = true, removeEmptyStrings = true } : { removeNulls?: boolean, removeEmptyStrings?: boolean } = {}) => {
    const firstStepResults = removeNulls
        ? objectWithoutNull(record)
        : Object.fromEntries(Object.entries(record));

    const stringResults = mapObject<any, string>(
        firstStepResults,
        (k, v) => ([k, v.toString()]),
    );

    return removeEmptyStrings
        ? filterObject(stringResults, (k, v) => v !== '')
        : stringResults;
}
