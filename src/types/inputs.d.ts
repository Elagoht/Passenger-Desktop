interface ICustomInputProps {
  label: string
  optional?: boolean
  error?: ReactNode | boolean | string[]
  success?: ReactNode | boolean
  message?: ReactNode
  iconLeft?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  iconRight?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
  validityIcons?: boolean
}