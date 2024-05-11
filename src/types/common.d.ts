export type Passphrase = {
  id: string
  platform: string
  url: string
  username: string | null
  email: string | null
  passphrase: string
  notes?: string
  createdAt: string
  updatedAt: string
  lastAccessedAt: string
  totalAccesses: number
}

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