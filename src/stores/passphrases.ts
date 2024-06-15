import { create } from "zustand"
import { DatabaseEntry } from "../types/common"

interface IPassphrasesSlice {
  passphrases: DatabaseEntry[]
  loadPassphrases: (passphrases: DatabaseEntry[]) => void
  addPassphrase: (passphrase: DatabaseEntry) => void
  updatePassphrase: (id: DatabaseEntry["id"], passphrase: DatabaseEntry) => void
  deletePassphrase: (id: string) => void
}

export const usePassphrasesSlice = create<IPassphrasesSlice>((set) => ({
  passphrases: [],

  loadPassphrases: (passphrases) => set({
    passphrases
  }),

  addPassphrase: (passphrase) => set((state) => ({
    passphrases: [
      ...state.passphrases,
      passphrase
    ]
  })),

  updatePassphrase: (id, passphrase) => set((state) => {
    const index = state.passphrases.findIndex((entry) => entry.id === id)
    if (index === -1) return state
    state.passphrases[index] = {
      ...state.passphrases[index],
      ...passphrase
    }
    return {
      passphrases: state.passphrases
    }
  }),

  deletePassphrase: (id) => set((state) => ({
    passphrases: state.passphrases
      .filter((p) => p.id !== id)
  }))
}))