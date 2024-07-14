import { Output } from "@/api/cli"
import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import Toast from "./notifications"
import StringHelper from "./string"

class FormikHelper {
  public static isEdited = (initialValues: object, values: object): boolean =>
    Object
      .keys(initialValues)
      .some((key) =>
        !Object.keys(values).includes(key)
        || initialValues[key as keyof typeof initialValues]
        !== values[key as keyof typeof values]
      )

  public static handleApiResponse = (
    response: Awaited<Promise<Output>>,
    successAction?: CallableFunction,
    errorTitle?: string,
    errorMessage?: string,
    errorIcon?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  ) => {
    if (response.status !== 0) return Toast.error(
      errorTitle,
      errorMessage || StringHelper.removeUnixErrorPrefix(response.stderr),
      errorIcon
    )
    return successAction?.()
  }
}

export default FormikHelper