import { Output } from "@/api/cli"
import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import Toast from "./notifications"
import StringHelper from "./string"
import { Response } from "@tauri-apps/api/http"

const handleResponse = (
  response: Awaited<Promise<Output>>,
  onSuccess: [
    CallableFunction,
    {
      successTitle?: string,
      successMessage?: string,
      successIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
    }?
  ],
  onError: [
    CallableFunction,
    {
      errorTitle?: string,
      errorMessage?: string,
      errorIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
    }?
  ],
) => {
  if (response.status === 0) {
    onSuccess?.[1] && Toast.success({
      title: onSuccess[1].successTitle,
      message: onSuccess[1].successMessage || response.stdout,
      icon: onSuccess[1].successIcon
    })
    return onSuccess?.[0]()
  }

  onError?.[1] && Toast.error({
    title: onError[1].errorTitle,
    message: onError[1].errorMessage || StringHelper.removeUnixErrorPrefix(response.stderr),
    icon: onError[1].errorIcon
  })
  return onError?.[0]()
}

export const handleHTTPResponse = (
  response: Response<unknown>,
  onSuccess: [
    CallableFunction,
    {
      successTitle?: string,
      successMessage?: string,
      successIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
    }?
  ],
  onError: [
    CallableFunction,
    {
      errorTitle?: string,
      errorMessage?: string,
      errorIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
    }?
  ],
) => {
  if (response.ok) {
    onSuccess?.[1] && Toast.success({
      title: onSuccess[1].successTitle,
      message: onSuccess[1].successMessage || "Success",
      icon: onSuccess[1].successIcon
    })
    return onSuccess?.[0]()
  }

  onError?.[1] && Toast.error({
    title: onError[1].errorTitle,
    message: onError[1].errorMessage || "Error",
    icon: onError[1].errorIcon
  })
  return onError?.[0]()
}

export default handleResponse