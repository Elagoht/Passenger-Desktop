import { Icon, IconAlertCircle, IconCheck, IconProps } from "@tabler/icons-react"
import { FC, ForwardRefExoticComponent, RefAttributes, createElement } from "react"

interface IInputValidityIconsProps {
  validityIcons: boolean
  error: boolean
  success: boolean
  iconRight?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
}

const InputValidityIcons: FC<IInputValidityIconsProps> = ({
  error, success, validityIcons, iconRight
}) => {
  return validityIcons
    ? error
      ? <IconAlertCircle size="32" />
      : success
        ? <IconCheck size="32" />
        : iconRight && createElement(iconRight, {
          size: 32,
          className: "transition-all duration-300 ease-in-out"
        })
    : iconRight && createElement(iconRight, {
      size: 32,
      className: "transition-all duration-300 ease-in-out"
    })
}

export default InputValidityIcons
