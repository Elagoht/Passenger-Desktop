import { FC } from "react"
import { usePassphrasesSlice } from "../../stores/passphrases"
import { ListablePassphrase } from "../../types/common"
import Copier from "./Copier"
import LinkOpener from "./LinkOpener"
import classNames from "classnames"

interface IPassphraseCardProps extends ListablePassphrase {
  selected: boolean
  index: number
}

const PassphraseCard: FC<IPassphraseCardProps> = ({ email, id, platform, username, url, selected, index }) => {
  const setSelectedPassphrase = usePassphrasesSlice((state) => state.selectPassphrase)
  const openDetails = usePassphrasesSlice((state) => state.openDetails)

  return <li
    key={id}
    onClick={() => {
      setSelectedPassphrase(index)
      openDetails()
    }}
    className={classNames({
      "flex items-center gap-2 p-3 rounded-lg hover:bg-tuatara-100 hover:dark:bg-tuatara-950 hover:shadow-inner hover:shadow-tuatara-200 hover:dark:shadow-stone-950 cursor-pointer hover:outline outline-1 outline-tuatara-50 dark:outline-tuatara-700 transition-all": true,
      "outline-lola-500 dark:outline-lola-500 outline-2 outline": selected
    })}
  >
    <img
      src={`https://logo.clearbit.com/${platform.toLowerCase()}.com`}
      alt={platform}
      width={48}
      height={48}
      className="rounded-full"
    />

    <div className="flex flex-col gap-1 flex-1">
      <strong>{platform}</strong>

      <div className="flex" role="contentinfo">
        {username &&
          <button
            onClick={(event) => {
              event.stopPropagation()
              navigator.clipboard.writeText(username)
            }}
            className="line-clamp-1 text-left hover:underline"
          >
            {username}
          </button>
        }

        {username && email && <span className="mx-1 text-tuatara-500">-</span>}

        {email &&
          <button
            onClick={(event) => {
              event.stopPropagation()
              navigator.clipboard.writeText(email)
            }}
            className="line-clamp-1 text-left hover:underline"
          >
            {email}
          </button>
        }
      </div>
    </div>

    <LinkOpener url={url} />

    <Copier value="password" />
  </li >
}

export default PassphraseCard
