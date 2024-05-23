import { filterObject, mapObject } from "./collections";

export const createUrl = (base: string, { query }: { query?: ConstructorParameters<typeof URLSearchParams>[0] } = {}) =>
    query == null
        ? base
        : base + '?' + new URLSearchParams(query).toString();

export const createQuery = (record: Record<string, any>) => mapObject<any, string>(
    filterObject(record, (k, v) => v != null),
    (k, v) => ([k, v.toString()]),
);
