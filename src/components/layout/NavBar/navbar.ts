import {
  IconBellSearch, IconChartPie, IconChartPieFilled,
  IconListSearch, IconPlus, IconSettings
} from "@tabler/icons-react"

const menuItems = [
  {
    "path": "/dashboard",
    "title": "Dashboard",
    "icon": IconChartPie,
    "filled": IconChartPieFilled
  },
  {
    "path": "/passphrases",
    "title": "Passphrases",
    "icon": IconListSearch
  },
  {
    "path": "/add-passphrase",
    "title": "Add Passphrase",
    "icon": IconPlus,
    "floating": true
  },
  {
    "path": "/detective",
    "title": "Detective",
    "icon": IconBellSearch
  },
  {
    "path": "/settings",
    "title": "Settings",
    "icon": IconSettings
  }
]

export default menuItems