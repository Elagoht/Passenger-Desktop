import { create } from "zustand"
import { ReadWriteDatabaseEntry } from "../types/common"

interface IPassphrasesSlice {
  passphrases: ReadWriteDatabaseEntry[]
  loadPassphrases: (passphrases: ReadWriteDatabaseEntry[]) => void
  addPassphrase: (passphrase: ReadWriteDatabaseEntry) => void
  updatePassphrase: (id: ReadWriteDatabaseEntry["id"], passphrase: ReadWriteDatabaseEntry) => void
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