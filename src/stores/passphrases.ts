import { create } from "zustand"
import { Passphrase } from "../types/common"

interface PassphrasesSlice {
  passphrases: Passphrase[]
  selectedPassphrase: Passphrase | null
  detailsVisible: boolean
  openDetails: () => void
  closeDetails: () => void
  selectPassphrase: (state: Passphrase["id"] | null) => void
  setPassphrases: (passphrases: Passphrase[]) => void
  addPassphrase: (passphrase: Passphrase) => void
  updatePassphrase: (passphrase: Passphrase) => void
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
    passphrase: "Thi$1$@P@$$M0rD4M3",
    notes: "This is a note",
    lastAccessedAt: new Date().toISOString(),
    totalAccesses: 10
  }, {
    id: "2",
    platform: "Twitter",
    username: "john_doe",
    url: "https://twitter.com",
    email: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    passphrase: "Thisisapassword",
    notes: "This is a note",
    lastAccessedAt: new Date().toISOString(),
    totalAccesses: 5
  }, {
    id: "3",
    platform: "Instagram",
    username: "john_doe",
    url: "https://instagram.com",
    email: "john@doe.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    passphrase: "Thisisapassword",
    notes: "This is a note",
    lastAccessedAt: new Date().toISOString(),
    totalAccesses: 8
  }],

  selectedPassphrase: null,

  detailsVisible: false,

  openDetails: () => set({
    detailsVisible: true
  }),

  closeDetails: () => set({
    detailsVisible: false
  }),

  selectPassphrase: (id) => set((state) => ({
    selectedPassphrase: id === null
      ? null
      : state.passphrases.find((p) => p.id === id)
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