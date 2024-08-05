import Button from "@/components/formElements/Button"
import handleResponse from "@/helpers/services"
import { manipulatePassphrase } from "@/services/generationServices"
import { IconRotate } from "@tabler/icons-react"
import { FC } from "react"

interface IManipulateButtonProps {
  currentPassphrase: string
  setFieldValue: (field: string, value: string) => void
}

const ManipulateButton: FC<IManipulateButtonProps> = ({ currentPassphrase, setFieldValue }) =>
  <Button
    rightIcon={<IconRotate />}
    type="button"
    variant="ghost"
    onClick={() => manipulatePassphrase(
      currentPassphrase
    ).then((response) => handleResponse(
      response,
      [() => setFieldValue("passphrase", response.stdout)],
      [() => void 0, {
        errorTitle: "Failed to manipulate passphrase"
      }]
    ))}
  >
    Manipulate
  </Button>

export default ManipulateButton
