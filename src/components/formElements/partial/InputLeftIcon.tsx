import { Icon, IconProps } from "@tabler/icons-react"
import { FC, ForwardRefExoticComponent, RefAttributes, createElement } from "react"

interface IInputLeftIconProps {
  iconLeft?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
}

const InputLeftIcon: FC<IInputLeftIconProps> = ({ iconLeft }) =>
  iconLeft && createElement(iconLeft, {
    size: 32,
    className: "transition-all duration-300 ease-in-out"
  })

export default InputLeftIcon
