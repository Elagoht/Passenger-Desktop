import { create } from "zustand"

interface IAuthorizationSlice {
  isAuthorized: boolean
  accessToken: string
  isGuideDone: boolean
  setIsAuthorizated: (state: boolean) => void
  setAccessToken: (token: string) => void
  setGuideDone: (state: boolean) => void
}

export const useAuthorizationSlice = create<IAuthorizationSlice>((set) => ({
  isAuthorized: false,

  accessToken: "",

  isGuideDone: false,

  setIsAuthorizated: (state) => set({
    isAuthorized: state
  }),

  setAccessToken: (token) => set({
    accessToken: token
  }),

  setGuideDone: (state) => set({
    isGuideDone: state
  })
}))