export type ListablePassphrase = {
  readonly id?: string
  platform: string
  identity: string
  url: string
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly lastAccessedAt?: string
}

export type Passphrase = ListablePassphrase & {
  passphrase: string
  notes?: string
  readonly totalAccesses?: number
}