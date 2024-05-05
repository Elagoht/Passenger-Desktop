import { create } from "zustand"

type WindowInfo = {
  id: string
  title: string
  contextMenu?: Element
  persistent?: boolean
}

interface WindowSlice {
  windowHistory: WindowInfo[]
  openWindow: (window: WindowInfo) => void
  closeWindow: () => void
  returnHome: () => void
}

export const useWindowSlice = create<WindowSlice>((set) => ({
  windowHistory: [],

  openWindow: (window) => set((state) => ({
    windowHistory: [...state.windowHistory, window]
  })),

  closeWindow: () => set((state) => ({
    windowHistory: state.windowHistory.slice(0, -1)
  })),

  returnHome: () => set({
    windowHistory: []
  })
}))