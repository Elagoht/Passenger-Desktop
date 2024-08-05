type MicroDatabaseEntry = {
  readonly id: string
  platform: string
  url: string
}

type CountableDatabaseEntry = MicroDatabaseEntry & {
  readonly totalAccesses: number
}

type ListableDatabaseEntry = CountableDatabaseEntry & {
  identity: string
  readonly createdAt: string
  readonly updatedAt: string
}

type ReadWriteDatabaseEntry = ListableDatabaseEntry & {
  passphrase: string
  notes?: string
}

type DatabaseEntry = ReadWriteDatabaseEntry & {
  readonly passphraseHistory: TrackablePassphrase[]
}

type CSVLineEntry = [string, string, string, string, string]

type TrackablePassphrase = {
  strength: number
  length: number
  created: string
}