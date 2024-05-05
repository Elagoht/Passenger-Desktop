import { create } from "zustand"

interface AuthorizationSlice {
  isAuthorized: boolean
  accessToken: string
  setIsAuthorizated: (state: boolean) => void
  setAccessToken: (token: string) => void
}

export const useAuthorizationSlice = create<AuthorizationSlice>((set) => ({
  isAuthorized: false,

  accessToken: "",

  setIsAuthorizated: (state) => set({
    isAuthorized: state
  }),

  setAccessToken: (token) => set({
    accessToken: token
  })
}))