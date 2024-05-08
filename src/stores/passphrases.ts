import { create } from "zustand"
import { ListablePassphrase } from "../types/common"

interface PassphrasesSlice {
  passphrases: ListablePassphrase[]
  selectedPassphrase: number
  detailsVisible: boolean
  openDetails: () => void
  closeDetails: () => void
  selectPassphrase: (state: number) => void
  selectPreviousPassphrase: () => void
  selectNextPassphrase: () => void
  setPassphrases: (passphrases: ListablePassphrase[]) => void
  addPassphrase: (passphrase: ListablePassphrase) => void
  updatePassphrase: (passphrase: ListablePassphrase) => void
  deletePassphrase: (id: string) => void
}

export const usePassphrasesSlice = create<PassphrasesSlice>((set) => ({
  passphrases: [{
    id: "1",
    platform: "Facebook",
    username: null,
    url: "https://facebook.com",
    email: "john@doe.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    id: "2",
    platform: "Twitter",
    username: "john_doe",
    url: "https://twitter.com",
    email: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    id: "3",
    platform: "Instagram",
    username: "john_doe",
    url: "https://instagram.com",
    email: "john@doe.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],

  selectedPassphrase: -1,

  detailsVisible: false,

  openDetails: () => set({
    detailsVisible: true
  }),

  closeDetails: () => set({
    detailsVisible: false
  }),

  selectPassphrase: (selectedPassphrase) => set({ selectedPassphrase }),

  selectPreviousPassphrase: () => set((state) => ({
    selectedPassphrase:
      state.selectedPassphrase - 1 < 0
        ? state.passphrases.length - 1
        : state.selectedPassphrase - 1
  })),

  selectNextPassphrase: () => set((state) => ({
    selectedPassphrase:
      state.selectedPassphrase + 1 >= state.passphrases.length
        ? 0
        : state.selectedPassphrase + 1
  })),

  setPassphrases: (passphrases) => set({
    passphrases
  }),

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