import { toastStore } from "@/lib/stores/notification"
import { Icon, IconCheck, IconExclamationCircle, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

class Toast {
  private static addToast = toastStore.getState().addToast

  public static success = ({
    title,
    message,
    icon
  }: {
    title?: string,
    message?: string,
    icon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  }) => this.addToast({
    type: "success",
    title: title || "Success!",
    message: message || "",
    icon: icon || IconCheck
  })

  public static error = ({
    title,
    message,
    icon
  }: {
    title?: string,
    message?: string,
    icon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  }) => this.addToast({
    type: "error",
    title: title || "An error occurred",
    message: message || "",
    icon: icon || IconExclamationCircle
  })
}

export default Toast