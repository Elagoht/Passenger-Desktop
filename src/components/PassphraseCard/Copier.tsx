import { IconCopy } from "@tabler/icons-react"
import { FC } from "react"

interface ICopierProps {
  value: string
}

const Copier: FC<ICopierProps> = ({ value }) => {
  return <button className="p-1 rounded-full bg-tuatara-100 dark:bg-tuatara-900 hover:bg-tuatara-200 dark:hover:bg-tuatara-800 transition-all shadow-inner flex items-center gap-1 justify-center">
    <div className="line-clamp-1">{value}</div>
    <IconCopy className="shrink-0" />
  </button>
}

export default Copier
