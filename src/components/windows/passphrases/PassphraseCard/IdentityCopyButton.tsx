import { IconCopyCheck, IconUser } from "@tabler/icons-react"
import { FC } from "react"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import { useNotificationSlice } from "@/lib/stores/notification"
import { ConstantPair, ListableDatabaseEntry, ReadWriteDatabaseEntry } from "@/types/common"
import { fetchEntry } from "@/services/passphraseServices"
import StringHelper from "@/helpers/string"
import { rememberConstantPair } from "@/services/constantPairServices"

interface IIdentityCopyButtonProps {
  id: ListableDatabaseEntry["id"]
}

const IdentityCopyButton: FC<IIdentityCopyButtonProps> = ({ id }) => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <button
    onClick={() => fetchEntry(
      accessToken,
      id
    ).then(async (response) => {
      if (response.status !== 0) return addNotification({
        type: "error",
        title: "Failed to obtain identity",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })

      const { identity } = StringHelper.deserialize<ReadWriteDatabaseEntry>(response.stdout)

      const result = identity.startsWith("_$")
        ? await rememberConstantPair(
          accessToken,
          identity.substring(2)
        ).then((response) => {
          if (response.status === 0) return StringHelper
            .deserialize<ConstantPair>(response.stdout).value
          addNotification({
            type: "error",
            title: "Not recognized",
            message: "This key has no paired value!"
          })
          return null
        })
        : identity

      if (result === null) return

      navigator.clipboard.writeText(
        result ?? identity // Fallback to original identity if result is null
      ).then(() => addNotification({
        type: "success",
        icon: <IconCopyCheck />,
        message: "I kwnow who you are 😉"
      })).catch(() => addNotification({
        type: "error",
        title: "Failed to copy identity",
        message: "Please try again"
      }))
    })}
    className="transition-all hover:bg-leaf-500 flex flex-col items-center justify-center leading-snug rounded-l-lg h-14 flex-1 hover:flex-[1.5] hover:text-white px-2"
  >
    <IconUser /> Identity
  </button>
}

export default IdentityCopyButton
