export type MicroDatabaseEntry = {
  readonly id: string
  platform: string
  url: string
}

export type CountableDatabaseEntry = MicroDatabaseEntry & {
  readonly totalAccesses: number
}

export type ListableDatabaseEntry = CountableDatabaseEntry & {
  identity: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type DatabaseEntry = ListableDatabaseEntry & {
  passphrase: string
  notes?: string
}

export type ConstantPair = {
  key: string
  value: string
}