import { create } from "zustand"

interface AuthorizationStore {
  isReAuthModalOpen: boolean
  openReAuthModal: () => void
  closeReAuthModal: () => void
}

export const authStore = create<AuthorizationStore>((set) => ({
  isReAuthModalOpen: false,

  openReAuthModal: () => set({
    isReAuthModalOpen: true
  }),

  closeReAuthModal: () => set({
    isReAuthModalOpen: false
  })
}))