import Window from "@/components/layout/Window"
import SettingsGroup from "@/components/windows/settings/SettingsGroup"
import { IconBrowser, IconDatabaseExport, IconFileExport, IconKey } from "@tabler/icons-react"
import { FC } from "react"

const WinSettings: FC = () => {

  return <Window
    title="Settings"
    className="flex flex-col gap-4"
  >
    <SettingsGroup
      title="Security"
      items={[{
        icon: IconKey,
        label: "Reset Master Passphrase",
        link: "/settings/reset-master-passphrase"
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
  </Window>
}

export default WinSettings
