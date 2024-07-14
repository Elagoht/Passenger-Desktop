import { create } from "zustand"

interface IAuthStore {
  isAuthorized: boolean
  accessToken: string
  isGuideDone: boolean
  doesRequireReAuth: boolean
  setIsAuthorizated: (state: boolean) => void
  setAccessToken: (token: string) => void
  setIsGuideDone: (state: boolean) => void
  setDoesRequireReAuth: (state: boolean) => void
}

export const authStore = create<IAuthStore>((set) => ({
  isAuthorized: false,

  accessToken: "",

  isGuideDone: false,

  doesRequireReAuth: false,

  setIsAuthorizated: (state) => set({
    isAuthorized: state
  }),

  setAccessToken: (token) => set({
    accessToken: token
  }),

  setIsGuideDone: (state) => set({
    isGuideDone: state
  }),

  setDoesRequireReAuth: (state) => set({
    doesRequireReAuth: state
  })
}))