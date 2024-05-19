import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react"
import { FC } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PassphraseDetailsForm from "../../../components/(passphrases)/PassphraseDetailsForm"
import Window from "../../../components/layout/Window"
import { usePassphrasesSlice } from "../../../stores/passphrases"
import { Link } from "react-router-dom"

const WinPassphraseDetails: FC = () => {
  const navigate = useNavigate()

  const passphraseId = useParams<{ id: string }>()
  const passphrases = usePassphrasesSlice((state) => state.passphrases)
  const selectedPassphrase = passphrases.find((passphrase) => passphrase.id === passphraseId.id)

  // If the passphrase is not found, navigate to the passphrases page
  if (!selectedPassphrase) {
    navigate("/passphrases")
    return null
  }

  return <Window compact>
    <div className="flex gap-2 items-center">
      <Link
        to="/passphrases"
        className="hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl transition-all duration-300"
      >
        <IconArrowLeft size={32} />
      </Link>

      <img
        src={`https://logo.clearbit.com/${selectedPassphrase.platform.toLowerCase()}.com`}
        alt={selectedPassphrase.platform}
        width={48}
        height={48}
        draggable="false"
        className="rounded-full"
      />

      <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
        {selectedPassphrase.platform}
      </h1>

      <a
        href={selectedPassphrase.url}
        target="_blank"
        rel="noreferrer"
      >
        <IconExternalLink className="stroke-tuatara-500 hover:stroke-tuatara-400" />
      </a>
    </div>

    <PassphraseDetailsForm
      {...selectedPassphrase}
    />
  </Window>
}

export default WinPassphraseDetails
