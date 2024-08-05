import Toast from "@/helpers/notifications"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { useAuth } from "@/hooks/authorization"
import { fetchEntry } from "@/services/passphraseServices"
import { IconCopyCheck, IconKey } from "@tabler/icons-react"
import { FC } from "react"

interface IPassphraseCopyButtonProps {
  id: ListableDatabaseEntry["id"]
}

const PassphraseCopyButton: FC<IPassphraseCopyButtonProps> = ({ id }) =>
  <button
    onClick={() => fetchEntry(
      useAuth(),
      id
    ).then((response) => handleResponse(
      response,
      [() => {
        const { passphrase } = StringHelper.deserialize<ReadWriteDatabaseEntry>(response.stdout)

        navigator.clipboard.writeText(
          passphrase
        ).then(() => Toast.success({
          icon: IconCopyCheck,
          message: "Don't show anyone"
        })).catch(() => Toast.error({
          title: "Failed to copy passphrase",
          message: "An error occurred while copying the passphrase."
        }))
      }],
      [() => void 0, {
        errorTitle: "Failed to obtain",
        errorMessage: "Couldn't fetch the passphrase."
      }]
    ))}
    className="transition-all hover:bg-creamcan-500 flex flex-col items-center justify-center leading-snug rounded-r-lg h-14 flex-1 hover:flex-[1.5] hover:text-white px-2"
  >
    <IconKey /> Passphrase
  </button>

export default PassphraseCopyButton
