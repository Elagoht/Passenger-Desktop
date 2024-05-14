import { FC } from "react"
import { usePassphrasesSlice } from "../../../stores/passphrases"
import { ListablePassphrase } from "../../../types/common"
import Copier from "./Copier"
import LinkOpener from "./LinkOpener"

interface IPassphraseCardProps extends ListablePassphrase { }

const PassphraseCard: FC<IPassphraseCardProps> = ({ id, platform, url, }) => {
  const setSelectedPassphrase = usePassphrasesSlice((state) => state.selectPassphrase)
  const openDetails = usePassphrasesSlice((state) => state.openDetails)

  return <button
    key={id}
    onClick={() => {
      setSelectedPassphrase(id)
      openDetails()
    }}
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
  </button>
}

export default PassphraseCard
