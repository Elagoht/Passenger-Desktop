import { Icon, IconProps } from "@tabler/icons-react"
import { FC, ForwardRefExoticComponent, createElement } from "react"
import { Link } from "react-router-dom"

export type ISettingsItemProps = {
  icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  label: string
} & ({
  link: string
  action?: never
} | {
  action: () => void
  link?: never
})

const SettingsItem: FC<ISettingsItemProps> = ({ icon, label, action, link }) =>
  createElement(link
    ? Link
    : "div",
    {
      to: link
        ? link
        : undefined as unknown as string,
      className: "flex gap-2 items-center p-2 bg-tuatara-100 dark:bg-tuatara-900 hover:brightness-110 transition-all ease-in-out cursor-pointer first:rounded-t-md last:rounded-b-md",
      onClick: action
        ? action
        : undefined
    },
    <>
      {createElement(icon, { className: "text-creamcan-500" })}

      <span>{label}</span>
    </>
  )

export default SettingsItem
