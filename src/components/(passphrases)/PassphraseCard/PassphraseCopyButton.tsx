import { IconCopyCheck, IconKey } from "@tabler/icons-react"
import { FC } from "react"
import StringHelper from "../../../helpers/string"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ListablePassphrase, Passphrase } from "../../../types/common"

interface IPassphraseCopyButtonProps {
  id: ListablePassphrase["id"]
}

const PassphraseCopyButton: FC<IPassphraseCopyButtonProps> = ({ id }) => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <button
    onClick={() => Service.fetch(
      accessToken,
      id!
    ).then((response) => response.success
      ? navigator.clipboard.writeText(
        StringHelper.deserialize<Passphrase>(response.output).passphrase
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
        message: StringHelper.removeUnixErrorPrefix(response.output)
      })
    )}
    className="rounded-r-lg h-full bg-white dark:bg-tuatara-800 hover:brightness-90 transition-all aspect-square w-10 grid place-items-center shrink-0"
  >
    <IconKey />
  </button>
}

export default PassphraseCopyButton
