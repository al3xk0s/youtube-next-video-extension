export interface TypedEntity<Kind extends string = string> {
    kind: Kind;
    etag: string;
}
