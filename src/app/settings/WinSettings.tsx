import { IconBrowser, IconDatabaseExport, IconFileExport, IconKey, IconVariable } from "@tabler/icons-react"
import { FC } from "react"
import Window from "@/components/layout/Window"
import SettingsGroup from "@/components/windows/settings/SettingsGroup"

const WinSettings: FC = () => {

  return <Window
    compact
    className="flex flex-col gap-4"
  >
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
        link: "/settings/export-to-csv"
      }, {
        icon: IconBrowser,
        label: "Import from Browser/CSV",
        link: "/settings/import-from-browser"
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
