import Toast from "@/helpers/notifications"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { rememberConstantPair } from "@/services/constantPairServices"
import { fetchEntry } from "@/services/passphraseServices"
import { ConstantPair, ListableDatabaseEntry, ReadWriteDatabaseEntry } from "@/types/common"
import { IconCopyCheck, IconCopyOff, IconLineScan, IconUser } from "@tabler/icons-react"
import { FC } from "react"

interface IIdentityCopyButtonProps {
  id: ListableDatabaseEntry["id"]
}

const IdentityCopyButton: FC<IIdentityCopyButtonProps> = ({ id }) => {
  const accessToken = authStore(state => state.accessToken)

  return <button
    onClick={() => fetchEntry(
      accessToken,
      id
    ).then((response) => handleResponse(
      response,
      [async () => {
        const { identity } = StringHelper.deserialize<ReadWriteDatabaseEntry>(response.stdout)

        const result = identity.startsWith("_$")
          ? await rememberConstantPair(
            accessToken,
            identity.substring(2)
          ).then((response) => handleResponse(
            response,
            [() => StringHelper.deserialize<ConstantPair>(response.stdout).value],
            [() => void 0, {
              errorTitle: "Not recognized",
              errorMessage: "This key has no paired value!"
            }]
          )) : identity
        // In this point, result is should be a string in either case
        if (result === null) return

        navigator.clipboard.writeText(
          result ?? identity // Fallback to original identity if result is null
        ).then(() => Toast.success({
          icon: IconCopyCheck,
          message: "I know who you are 😉"
        })).catch(() => Toast.error({
          title: "Failed to copy identity",
          message: "An error occurred while copying the identity.",
          icon: IconCopyOff
        }))
      }],
      [() => void 0, {
        errorTitle: "Not recognized",
        errorIcon: IconLineScan
      }]
    ))}
    className="transition-all hover:bg-leaf-500 flex flex-col items-center justify-center leading-snug rounded-l-lg h-14 flex-1 hover:flex-[1.5] hover:text-white px-2"
  >
    <IconUser /> Identity
  </button >
}

export default IdentityCopyButton
