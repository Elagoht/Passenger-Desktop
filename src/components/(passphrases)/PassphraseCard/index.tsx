import { IconEdit } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { ListableDatabaseEntry } from "../../../types/common"
import IdentityCopyButton from "./IdentityCopyButton"
import PassphraseCopyButton from "./PassphraseCopyButton"

interface IPassphraseCardProps extends ListableDatabaseEntry { }

const PassphraseCard: FC<IPassphraseCardProps> = ({ id, platform, url }) => {
  return <li
    className="flex items-center rounded-lg transition-all w-full text-left bg-tuatara-50 dark:bg-tuatara-900 h-14 relative group">
    <nav className="absolute inset-0 flex group-hover:opacity-100 opacity-0
    bg-tuatara-50 dark:bg-tuatara-900 rounded-lg transition-all">
      <IdentityCopyButton id={id} />

      <Link
        to={`/passphrases/${id}`}
        draggable="false"
        className="grid place-items-center h-14 bg-white dark:bg-tuatara-800 transition-all aspect-square hover:bg-sky-500 hover:text-white flex-1">
        <IconEdit />
      </Link>

      <PassphraseCopyButton id={id} />
    </nav>

    <Link
      to={`/passphrases/${id}`}
      draggable="false"
      className="flex items-center grow p-3 gap-2 rounded-l-lg"
    >
      <img
        src={`https://icon.horse/icon/${new URL(
          url.startsWith("http")
            ? url
            : `http://${url}`
        ).hostname}`}
        onError={(event) => { (event.target as HTMLImageElement).src = "/icon.png" }}
        alt={platform}
        width={36}
        height={36}
        draggable="false"
        className="rounded-full"
      />

      <strong className="grow font-medium line-clamp-1">
        {platform}
      </strong>
    </Link>
  </li>
}

export default PassphraseCard
