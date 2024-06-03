import { IconBrowser, IconDatabaseExport, IconDatabaseImport, IconFileExport, IconKey, IconVariable } from "@tabler/icons-react"
import { FC } from "react"
import SettingsGroup from "../../components/(settings)/SettingsGroup"
import Window from "../../components/layout/Window"

const WinSettings: FC = () => {

  return <Window className="flex flex-col gap-4">
    <SettingsGroup
      title="Security"
      items={[{
        icon: IconKey,
        label: "Change Master Passphrase",
        action: () => void 0
      }, {
        icon: IconFileExport,
        label: "Export Secret Key",
        action: () => void 0
      }]}
    />

    <SettingsGroup
      title="DataBase"
      items={[{
        icon: IconDatabaseExport,
        label: "Export to CSV",
        action: () => void 0
      }, {
        icon: IconBrowser,
        label: "Import from Browser",
        action: () => void 0
      }, {
        icon: IconDatabaseImport,
        label: "Import from CSV",
        action: () => void 0
      }]}
    />

    <SettingsGroup
      title="Utilities"
      items={[{
        icon: IconVariable,
        label: "Constant Pairs",
        link: "/settings/constant-pairs"
      }]}
    />
  </Window>
}

export default WinSettings
