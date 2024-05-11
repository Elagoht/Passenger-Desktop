import { IconCopy } from "@tabler/icons-react"
import { FC } from "react"

interface ICopierProps {
  value: string
}

const Copier: FC<ICopierProps> = ({ value }) => {
  return <button
    onClick={(event) => {
      event.stopPropagation()
      navigator.clipboard.writeText(value)
    }}
    className="rounded-full bg-tuatara-100 dark:bg-tuatara-900 hover:brightness-95 transition-all shadow-inner border-tuatara-200 dark:border-tuatara-700 border shadow-tuatara-50 dark:shadow-tuatara-800 aspect-square w-10 grid place-items-center shrink-0"
  >
    <IconCopy />
  </button>
}

export default Copier
