export type ListablePassphrase = {
  id: string
  platform: string
  url: string
  username: string | null
  email: string | null
  createdAt: string
  updatedAt: string
  lastAccessedAt: string
}

export type Passphrase = ListablePassphrase & {
  passphrase: string
  notes?: string
  totalAccesses: number
}