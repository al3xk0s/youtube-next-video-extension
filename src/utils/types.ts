export type AnyNull = null | undefined;

export type NotNull<T, Null = AnyNull> = Exclude<T, Null>;

export type OmitMapped<Type, ToOmit> = {
    [Property in keyof Type as Exclude<Property, ToOmit>]: Type[Property];
};
