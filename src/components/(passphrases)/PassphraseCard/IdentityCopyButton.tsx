import { IconCopyCheck, IconIdBadge } from "@tabler/icons-react"
import { FC } from "react"
import StringHelper from "../../../helpers/string"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ConstantPair, ListablePassphrase, Passphrase } from "../../../types/common"

interface IIdentityCopyButtonProps {
  id: ListablePassphrase["id"]
}

const IdentityCopyButton: FC<IIdentityCopyButtonProps> = ({ id }) => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <button
    onClick={() => Service.fetch(
      accessToken,
      id!
    ).then(async (response) => {
      if (!response.success) return addNotification({
        type: "error",
        title: "Failed to obtain passphrase",
        message: StringHelper.removeUnixErrorPrefix(response.output)
      })

      const { identity } = StringHelper.deserialize<Passphrase>(response.output)

      const result = identity.startsWith("_$")
        ? await Service.remember(
          accessToken,
          identity.substring(2)
        ).then((response) => {
          if (!response.success) return addNotification({
            type: "error",
            title: "Failed to remember passphrase",
            message: StringHelper.removeUnixErrorPrefix(response.output)
          })

          return StringHelper.deserialize<ConstantPair>(response.output).value
        })
        : identity

      navigator.clipboard.writeText(
        result ?? identity // Fallback to original identity if result is null
      ).then(() => addNotification({
        type: "success",
        icon: <IconCopyCheck />,
        message: "Don't show anyone 😉"
      })).catch(() => addNotification({
        type: "error",
        title: "Failed to copy passphrase",
        message: "Please try again"
      }))
    })}
    className="h-full bg-white dark:bg-tuatara-800 hover:brightness-90 transition-all aspect-square w-10 grid place-items-center shrink-0"
  >
    <IconIdBadge />
  </button>
}

export default IdentityCopyButton
