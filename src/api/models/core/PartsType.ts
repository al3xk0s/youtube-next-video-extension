export type PartsType<T> =  keyof Omit<T, 'kind' | 'id' | 'etag' | 'regionCode'>;;