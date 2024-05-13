import { IconChartPie, IconChartPieFilled, IconExclamationCircle, IconListSearch, IconPlus, IconSettings } from "@tabler/icons-react"

const menuItems = [
  {
    "path": "dashboard",
    "title": "Dashboard",
    "icon": IconChartPie,
    "filled": IconChartPieFilled
  },
  {
    "path": "passphrases",
    "title": "Passphrases",
    "icon": IconListSearch
  },
  {
    "path": "add-passphrase",
    "title": "Add Passphrase",
    "icon": IconPlus,
    "floating": true
  },
  {
    "path": "actions-and-news",
    "title": "Actions & News",
    "icon": IconExclamationCircle
  },
  {
    "path": "settings",
    "title": "Settings",
    "icon": IconSettings
  }
]

export default menuItems