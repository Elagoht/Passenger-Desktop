import { IconCopyCheck, IconKey } from "@tabler/icons-react"
import { FC } from "react"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { fetchEntry } from "@/services/passphraseServices"
import StringHelper from "@/helpers/string"
import { ListableDatabaseEntry, ReadWriteDatabaseEntry } from "@/types/common"

interface IPassphraseCopyButtonProps {
  id: ListableDatabaseEntry["id"]
}

const PassphraseCopyButton: FC<IPassphraseCopyButtonProps> = ({ id }) => {
  const accessToken = authStore(state => state.accessToken)
  const addNotification = toastStore(state => state.addToast)

  return <button
    onClick={() => fetchEntry(
      accessToken,
      id
    ).then((response) => response.status === 0
      ? navigator.clipboard.writeText(
        StringHelper.deserialize<ReadWriteDatabaseEntry>(response.stdout).passphrase
      ).then(() => addNotification({
        type: "success",
        icon: <IconCopyCheck />,
        message: "Don't show anyone 😉"
      })).catch(() => addNotification({
        type: "error",
        title: "Failed to copy passphrase",
        message: "Please try again"
      }))
      : addNotification({
        type: "error",
        title: "Failed to obtain passphrase",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
    )}
    className="transition-all hover:bg-creamcan-500 flex flex-col items-center justify-center leading-snug rounded-r-lg h-14 flex-1 hover:flex-[1.5] hover:text-white px-2"
  >
    <IconKey /> Passphrase
  </button>
}

export default PassphraseCopyButton
