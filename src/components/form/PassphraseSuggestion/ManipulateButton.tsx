import { FC } from "react"
import Button from "../Button"
import { IconRotate } from "@tabler/icons-react"
import Service from "../../../services"
import { useNotificationSlice } from "../../../stores/notification"
import StringHelper from "../../../helpers/string"

interface IManipulateButtonProps {
  currentPassphrase: string
  setFieldValue: (field: string, value: string) => void
}

const ManipulateButton: FC<IManipulateButtonProps> = ({ currentPassphrase, setFieldValue }) => {
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Button
    rightIcon={<IconRotate />}
    type="button"
    color="secondary"
    onClick={() => Service.manipulate(
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
