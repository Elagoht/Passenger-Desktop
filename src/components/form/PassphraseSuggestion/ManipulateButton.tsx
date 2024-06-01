import { FC } from "react"
import Button from "../Button"
import { IconRotate } from "@tabler/icons-react"

interface IManipulateButtonProps {
  setFieldValue: (field: string, value: string) => void
}

const ManipulateButton: FC<IManipulateButtonProps> = ({ setFieldValue }) => {
  return <Button
    rightIcon={<IconRotate />}
    type="button"
    color="secondary"
    onClick={() => setFieldValue(
      "passphrase",
      "rotated"
    )}
  >
    Manipulate
  </Button>
}

export default ManipulateButton
