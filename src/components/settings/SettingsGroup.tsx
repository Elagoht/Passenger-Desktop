import { FC } from "react"
import SettingsItem, { ISettingsItemProps } from "./SettingsItem"

interface ISettingsGroupProps {
  title: string
  items: ISettingsItemProps[]
}

const SettingsGroup: FC<ISettingsGroupProps> = ({ items, title }) => {
  return <div className="grid gap-2">
    <h2 className="text-lg font-bold">{title}</h2>

    <div className="grid divide-y divide-tuatara-200 dark:divide-tuatara-800">
      {items.map((item, index) =>
        <SettingsItem
          key={index}
          {...item}
        />
      )}
    </div>
  </div>
}

export default SettingsGroup
