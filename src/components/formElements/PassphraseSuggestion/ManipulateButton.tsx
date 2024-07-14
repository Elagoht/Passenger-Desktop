import { FC } from "react"
import Button from "@/components/formElements/Button"
import { IconRotate } from "@tabler/icons-react"
import { toastStore } from "@/lib/stores/notification"
import StringHelper from "@/helpers/string"
import { manipulatePassphrase } from "@/services/generationServices"

interface IManipulateButtonProps {
  currentPassphrase: string
  setFieldValue: (field: string, value: string) => void
}

const ManipulateButton: FC<IManipulateButtonProps> = ({ currentPassphrase, setFieldValue }) => {
  const addNotification = toastStore(state => state.addToast)

  return <Button
    rightIcon={<IconRotate />}
    type="button"
    color="secondary"
    onClick={() => manipulatePassphrase(
      currentPassphrase
    ).then((response) => {
      if (response.status !== 0) return addNotification({
        type: "error",
        title: "Failed to manipulate passphrase",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
      setFieldValue("passphrase", response.stdout)
    })}
  >
    Manipulate
  </Button>
}

export default ManipulateButton
