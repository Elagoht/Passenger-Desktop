import { create } from "zustand"

interface IKeyringSlice {
  secretKey: string | null
  setSecretKey: (keyring: string | null) => void
}

export const useKeyringSlice = create<IKeyringSlice>((set) => ({
  secretKey: "",

  setSecretKey: (keyring) => set({
    secretKey: keyring
  })
}))