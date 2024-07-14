import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Loading from "@/components/layout/Loading"
import Window from "@/components/layout/Window"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { fetchEntry } from "@/services/passphraseServices"
import { DatabaseEntry } from "@/types/common"
import { Maybe } from "@/types/utility"
import PassphraseDeleteButton from "@/components/windows/passphrases/PassphraseDeleteButton"
import PassphraseEntryForm from "@/components/forms/PassphraseEntryForm"
import handleResponse from "@/helpers/services"

const WinPassphraseDetails: FC = () => {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()[0]
  const navigate = useNavigate()
  const accessToken = authStore((state) => state.accessToken)
  const [entry, setEntry] = useState<Maybe<DatabaseEntry>>(null)

  useEffect(() => {
    fetchEntry(
      accessToken,
      params.id!
    ).then((response) => handleResponse(
      response,
      [() => setEntry(StringHelper.deserialize<DatabaseEntry>(response.stdout))],
      [() => navigate("/passphrases"), {
        errorTitle: "Passphrase not found",
        errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr)
      }],
    ))
  }, [])

  if (!entry) return <Loading />

  return <Window>
    <div className="flex gap-2 items-center mb-4">
      <Link
        to={searchParams.get("cameFrom") || "/passphrases"}
        draggable="false"
        className="hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl transition-all duration-300"
      >
        <IconArrowLeft size={32} />
      </Link>

      <img
        src={`https://icon.horse/icon/${new URL(
          entry.url.startsWith("http")
            ? entry.url
            : `http://${entry.url}`
        ).hostname}`}
        onError={(event) => { (event.target as HTMLImageElement).src = "/icon.png" }}
        alt={entry.platform}
        width={48}
        height={48}
        draggable="false"
        className="rounded-full"
      />

      <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
        {entry?.platform}
      </h1>

      <a
        href={new URL(entry.url.startsWith("http")
          ? entry.url
          : `https://${entry.url}`
        ).toString()}
        target="_blank"
        rel="noreferrer"
      >
        <IconExternalLink className="stroke-tuatara-500 hover:stroke-tuatara-400" />
      </a>
    </div>

    <PassphraseEntryForm
      mode="edit"
      existing={entry}
    />

    <div className="grow flex items-end">
      <PassphraseDeleteButton id={entry.id} />
    </div>
  </Window>
}

export default WinPassphraseDetails
