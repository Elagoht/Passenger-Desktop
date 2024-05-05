export type Passphrase = {
  id: string;
  platform: string;
  username: string | null;
  email: string | null;
  passphrase: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type ListablePassphrase = {
  id: string;
  platform: string;
  username: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
};