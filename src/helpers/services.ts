import { Output } from "@/api/cli"
import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import Toast from "./notifications"
import StringHelper from "./string"

const handleResponse = (
  response: Awaited<Promise<Output>>,
  successAction?: CallableFunction,
  {
    errorTitle,
    errorMessage,
    errorIcon
  }: {
    errorTitle?: string,
    errorMessage?: string,
    errorIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  } = {}
) => {
  if (response.status !== 0) return Toast.error({
    title: errorTitle,
    message: errorMessage || StringHelper.removeUnixErrorPrefix(response.stderr),
    icon: errorIcon
  })
  return successAction?.()
}

export default handleResponse