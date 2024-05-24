import { IconCopy, IconExternalLink } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"
import StringHelper from "../../../helpers/string"
import { Passphrase } from "../../../types/common"

interface IPassphraseCardProps extends Passphrase { }

const PassphraseCard: FC<IPassphraseCardProps> = ({ id, platform, url, passphrase }) => {

  return <li className="flex items-center rounded-lg hover:bg-tuatara-50 hover:dark:bg-tuatara-900 transition-all w-full text-left bg-tuatara-50 dark:bg-tuatara-900">
    <Link
      to={`/passphrases/${id}`}
      draggable="false"
      className="flex items-center grow m-3 gap-2"
    >
      <img
        src={`https://logo.clearbit.com/${platform.toLowerCase()}.com`}
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

    <a
      target="_blank"
      rel="noopener noreferrer"
      href={StringHelper.urlify(url)}
      className="ml-2 h-full bg-white dark:bg-tuatara-800 hover:brightness-90 transition-all aspect-square w-10 grid place-items-center shrink-0"
    >
      <IconExternalLink />
    </a>

    <button
      onClick={() => navigator.clipboard.writeText(passphrase)}
      className="rounded-r-lg h-full bg-white dark:bg-tuatara-800 hover:brightness-90 transition-all aspect-square w-10 grid place-items-center shrink-0"
    >
      <IconCopy />
    </button >
  </li>
}

export default PassphraseCard
