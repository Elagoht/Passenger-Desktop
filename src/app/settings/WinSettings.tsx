import Window from "@/components/layout/Window"
import SettingsGroup from "@/components/windows/settings/SettingsGroup"
import Toast from "@/helpers/notifications"
import { IconBrowser, IconClipboardCheck, IconDatabaseExport, IconFileExport, IconKey, IconSkull } from "@tabler/icons-react"
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
        action: () => {
          const secretKey = localStorage.getItem("SECRET_KEY")
          if (!secretKey) return Toast.error({
            title: "Secret key not found",
            message: "Failed to export the secret key.",
            icon: IconSkull
          })
          navigator.clipboard.writeText(secretKey).then(() =>
            Toast.success({
              title: "Secret key copied",
              message: "Do not share this key with anyone.",
              icon: IconClipboardCheck
            })
          ).catch(() => Toast.error({
            title: "Failed to copy secret key",
            message: "An error occurred while copying the secret key."
          }))
        }
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
