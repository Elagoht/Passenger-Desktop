import { IconChartPie, IconChartPieFilled, IconExclamationCircle, IconListSearch, IconPlus, IconSettings } from "@tabler/icons-react"

const menuItems = [
  {
    "slug": "dashboard",
    "title": "Dashboard",
    "icon": IconChartPie,
    "filled": IconChartPieFilled
  },
  {
    "slug": "passphrases",
    "title": "Passphrases",
    "icon": IconListSearch
  },
  {
    "slug": "add-new",
    "title": "Add New",
    "icon": IconPlus,
    "floating": true
  },
  {
    "slug": "actions-and-news",
    "title": "Actions & News",
    "icon": IconExclamationCircle
  },
  {
    "slug": "settings",
    "title": "Settings",
    "icon": IconSettings
  }
]

export default menuItems