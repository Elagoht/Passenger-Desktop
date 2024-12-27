import { create } from "zustand"

interface AuthorizationStore {
  isAuthorized: boolean
  isReAuthModalOpen: boolean
  openReAuthModal: () => void
  closeReAuthModal: () => void
  logInUser: () => void
  logOutUser: () => void
}

export const authStore = create<AuthorizationStore>((set) => ({
  isAuthorized: false,

  isReAuthModalOpen: false,

  openReAuthModal: () => set({
    isReAuthModalOpen: true
  }),

  closeReAuthModal: () => set({
    isReAuthModalOpen: false
  }),

  logInUser: () => set({
    isAuthorized: true,
    isReAuthModalOpen: false
  }),

  logOutUser: () => set({
    isAuthorized: false,
    isReAuthModalOpen: true
  })
}))