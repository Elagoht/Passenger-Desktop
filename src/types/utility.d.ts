type MutableKeysOf<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : K
}[keyof T]

type Mutable<T> = Pick<T, MutableKeysOf<T>>;
type SingleOrMore<T> = T | T[]
type Maybe<T> = T | null
