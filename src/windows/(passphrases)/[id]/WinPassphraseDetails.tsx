import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Commands from "../../../api/cli"
import PassphraseDeleteButton from "../../../components/(passphrases)/PassphraseDeleteButton"
import PassphraseDetailsForm from "../../../components/(passphrases)/PassphraseDetailsForm"
import Loading from "../../../components/layout/Loading"
import Window from "../../../components/layout/Window"
import StringHelper from "../../../helpers/string"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { Passphrase } from "../../../types/common"

const WinPassphraseDetails: FC = () => {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()[0]
  const navigate = useNavigate()
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)
  const [entry, setEntry] = useState<Passphrase | null>(null)

  useEffect(() => {
    Commands.fetch(
      accessToken,
      params.id!
    ).then((response) => {
      if (response.success)
        return setEntry(JSON.parse(response.output))
      addNotification({
        title: "Passphrase not found",
        message: StringHelper.removeUnixErrorPrefix(response.output),
        type: "error"
      })
      navigate("/passphrases")
    })
  }, [])

  if (!entry) return <Loading />

  return <Window compact>
    <div className="flex flex-col h-full mb-4">
      <div className="flex gap-2 items-center mb-4">
        <Link
          to={searchParams.get("cameFrom") || "/passphrases"}
          draggable="false"
          className="hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl transition-all duration-300"
        >
          <IconArrowLeft size={32} />
        </Link>

        <img
          src={`https://logo.clearbit.com/${entry?.platform.toLowerCase()}.com`}
          alt={entry?.platform}
          width={48}
          height={48}
          draggable="false"
          className="rounded-full"
        />

        <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
          {entry?.platform}
        </h1>

        <a
          href={entry?.url}
          target="_blank"
          rel="noreferrer"
        >
          <IconExternalLink className="stroke-tuatara-500 hover:stroke-tuatara-400" />
        </a>
      </div>

      <PassphraseDetailsForm
        id={entry.id}
        platform={entry.platform}
        identity={entry.identity}
        url={entry.url}
        passphrase={entry.passphrase}
        notes={entry.notes}
      />

      <div className="grow flex items-end">
        <PassphraseDeleteButton id={entry.id!} />
      </div>
    </div>
  </Window>
}

export default WinPassphraseDetails
