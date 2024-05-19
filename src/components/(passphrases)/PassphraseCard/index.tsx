import { FC } from "react"
import { Link } from "react-router-dom"
import { ListablePassphrase } from "../../../types/common"
import Copier from "./Copier"
import LinkOpener from "./LinkOpener"

interface IPassphraseCardProps extends ListablePassphrase { }

const PassphraseCard: FC<IPassphraseCardProps> = ({ id, platform, url }) => {

  return <li>
    <Link
      to={`/passphrases/${id}`}
      className="flex items-center gap-2 p-3 rounded-lg hover:bg-tuatara-50 hover:dark:bg-tuatara-900 transition-all w-full text-left bg-tuatara-50 dark:bg-tuatara-900"
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

      <LinkOpener url={url} />

      <Copier value="password" />
    </Link>
  </li>
}

export default PassphraseCard
