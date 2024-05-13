import { IconExternalLink } from "@tabler/icons-react"
import { FC } from "react"

interface ICopierProps {
  url: string
}

const LinkOpener: FC<ICopierProps> = ({ url }) => {
  return <a
    href={url}
    target="_blank"
    rel="noreferrer"
    onClick={(event) => {
      event.stopPropagation()
      navigator.clipboard.writeText(url)
    }}
    className="rounded-full bg-tuatara-100 dark:bg-tuatara-900 hover:brightness-95 transition-all shadow-inner border-tuatara-200 dark:border-tuatara-700 border shadow-tuatara-50 dark:shadow-tuatara-800 aspect-square w-10 grid place-items-center shrink-0"
  >
    <IconExternalLink />
  </a>
}

export default LinkOpener
