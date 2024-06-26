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
        className="transition-all hover:bg-sky-500 flex flex-col items-center justify-center leading-snug h-14 flex-1 hover:flex-[1.5] hover:text-white px-2">
        <IconEdit /> Edit
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
