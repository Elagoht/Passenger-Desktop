import { create } from "zustand"

interface WindowSlice {
  window: string
  setWindow: (window: string) => void
}

export const useWindow = create<WindowSlice>((set) => ({
  window: "dashboard",

  setWindow: (window) => set({
    window
  })
}))