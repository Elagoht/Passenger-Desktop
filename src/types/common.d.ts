export type ListablePassphrase = {
  readonly id?: string
  platform: string
  identity: string
  url: string
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly lastAccessedAt?: string
  readonly totalAccesses?: number
}

export type Passphrase = ListablePassphrase & {
  passphrase: string
  notes?: string
}