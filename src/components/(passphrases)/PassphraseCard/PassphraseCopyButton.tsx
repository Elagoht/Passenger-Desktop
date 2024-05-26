import { IconCopy, IconCopyCheck } from "@tabler/icons-react"
import { FC } from "react"
import Commands from "../../../api/cli"
import StringHelper from "../../../helpers/string"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ListablePassphrase } from "../../../types/common"

interface IPassphraseCopyButtonProps {
  id: ListablePassphrase["id"]
}

const PassphraseCopyButton: FC<IPassphraseCopyButtonProps> = ({ id }) => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <button
    onClick={() => Commands.fetch(
      accessToken,
      id!
    ).then((response) => {
      if (!response.success) return addNotification({
        type: "error",
        title: "Failed to obtain passphrase",
        message: StringHelper.removeUnixErrorPrefix(response.output)
      })
      navigator.clipboard.writeText(JSON.parse(response.output).passphrase)
      addNotification({
        type: "success",
        icon: <IconCopyCheck />,
        message: "Don't show anyone 😉"
      })
    })}
    className="rounded-r-lg h-full bg-white dark:bg-tuatara-800 hover:brightness-90 transition-all aspect-square w-10 grid place-items-center shrink-0"
  >
    <IconCopy />
  </button>
}

export default PassphraseCopyButton
