import { create } from "zustand"

interface IAuthorizationSlice {
  isAuthorized: boolean
  accessToken: string
  setIsAuthorizated: (state: boolean) => void
  setAccessToken: (token: string) => void
}

export const useAuthorizationSlice = create<IAuthorizationSlice>((set) => ({
  isAuthorized: false,

  accessToken: "",

  setIsAuthorizated: (state) => set({
    isAuthorized: state
  }),

  setAccessToken: (token) => set({
    accessToken: token
  })
}))