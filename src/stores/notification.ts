import { ReactNode } from "react"
import { create } from "zustand"

export interface IToast {
  id: string
  message: string
  type?: "info" | "success" | "warning" | "error"
  persistant?: boolean
  clickToClose?: boolean
  duration?: number
  icon?: ReactNode
  title?: string
  buttons?: Array<{
    type: "info" | "success" | "warning" | "error"
    label: string
    action: () => void
    icon?: ReactNode
  }>
}

interface INotificationSlice {
  notifications: IToast[]
  addNotification: (notification: Omit<IToast, "id">) => void
  removeNotification: (id: IToast["id"]) => void
  clearNotifications: () => void
}

export const useNotificationSlice = create<INotificationSlice>((set) => ({
  notifications: [],

  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: `notification-${Date.now()}`,
        // Default values
        duration: 2500,
        clickToClose: true,
        persistant: false,
        type: "info",
        ...notification,
      }
    ]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications
      .filter((notification) => notification.id !== id)
  })),

  clearNotifications: () => set({
    notifications: []
  })
}))