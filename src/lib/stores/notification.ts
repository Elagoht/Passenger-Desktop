import { Icon, IconProps } from "@tabler/icons-react"
import { nanoid } from "nanoid"
import {
  ForwardRefExoticComponent,
  ReactNode, RefAttributes
} from "react"
import { create } from "zustand"

export interface IToast {
  id: string
  message: string
  type?: "info" | "success" | "warning" | "error"
  persistant?: boolean
  clickToClose?: boolean
  duration?: number
  icon?: ForwardRefExoticComponent<
    Omit<IconProps, "ref">
    & RefAttributes<Icon>
  >
  title?: string
  buttons?: Array<{
    type: "info" | "success" | "warning" | "error"
    label: string
    action: () => void
    icon?: ReactNode
  }>
}

interface INotificationStore {
  toasts: IToast[]
  addToast: (notification: Omit<IToast, "id">) => void
  removeToast: (id: IToast["id"]) => void
  clearToasts: () => void
}

export const toastStore = create<INotificationStore>((set) => ({
  toasts: [],

  addToast: (notification) => set((state) => ({
    toasts: [
      ...state.toasts,
      {
        id: nanoid(),
        // Default values
        duration: 2500,
        clickToClose: true,
        persistant: false,
        type: "info",
        ...notification,
      }
    ]
  })),

  removeToast: (id) => set((state) => ({
    toasts: state.toasts
      .filter((notification) => notification.id !== id)
  })),

  clearToasts: () => set({
    toasts: []
  })
}))