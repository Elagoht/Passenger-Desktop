export type ListablePassphrase = {
  id: string
  platform: string
  url: string
  identity: string
  createdAt: string
  updatedAt: string
  lastAccessedAt: string
}

export type Passphrase = ListablePassphrase & {
  passphrase: string
  notes?: string
  totalAccesses: number
}