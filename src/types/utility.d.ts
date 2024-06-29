type MutableKeysOf<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : K
}[keyof T]

export type Mutable<T> = Pick<T, MutableKeysOf<T>>;
export type SingleOrMore<T> = T | T[]
export type Maybe<T> = T | null | undefined
