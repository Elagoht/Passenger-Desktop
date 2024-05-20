import { create } from "zustand"
import { Passphrase } from "../types/common"

interface IPassphrasesSlice {
  passphrases: Passphrase[]
  loadPassphrases: () => void
  addPassphrase: (passphrase: Passphrase) => void
  updatePassphrase: (passphrase: Passphrase) => void
  deletePassphrase: (id: string) => void
}

export const usePassphrasesSlice = create<IPassphrasesSlice>((set) => ({
  passphrases: [],

  loadPassphrases: () => set((state) => ({
    passphrases: state.passphrases
  })),

  addPassphrase: (passphrase) => set((state) => ({
    passphrases: [
      ...state.passphrases,
      passphrase
    ]
  })),

  updatePassphrase: (passphrase) => set((state) => ({
    passphrases: state.passphrases.map((passpahras) =>
      passpahras.id === passphrase.id
        ? passphrase
        : passpahras
    )
  })),

  deletePassphrase: (id) => set((state) => ({
    passphrases: state.passphrases
      .filter((p) => p.id !== id)
  }))
}))