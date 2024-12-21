import Toast from "@/helpers/notifications"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { useAuth } from "@/hooks/authorization"
import { fetchEntry } from "@/services/passphraseServices"
import { IconCopyCheck, IconCopyOff, IconLineScan, IconUser } from "@tabler/icons-react"
import { FC } from "react"

interface IIdentityCopyButtonProps {
  id: ListableDatabaseEntry["id"]
}

const IdentityCopyButton: FC<IIdentityCopyButtonProps> = ({ id }) =>
  <button
    onClick={() => fetchEntry(
      useAuth(),
      id
    ).then((response) => handleResponse(
      response,
      [() => {
        navigator.clipboard.writeText(
          StringHelper.deserialize<ReadWriteDatabaseEntry>(
            response.stdout
          ).identity
        ).then(() => Toast.success({
          icon: IconCopyCheck,
          message: "Identity copied to clipboard.",
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
  </button>

export default IdentityCopyButton
