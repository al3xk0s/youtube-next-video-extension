export type AnyNull = null | undefined;

export type NotNull<T, Null = AnyNull> = Exclude<T, Null>;