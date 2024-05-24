import { IconX } from "@tabler/icons-react"
import classNames from "classnames"
import { FC } from "react"

interface IModalCloseButtonProps {
  close: () => void
  className?: string
}

const ModalCloseButton: FC<IModalCloseButtonProps> = ({ close, className }) => {
  return <button
    type="button" // Prevent form submission
    className={classNames(
      "text-tuatara-500 hover:text-tuatara-50 hover:bg-red-500 hover:bg-opacity-50 p-2 rounded-full",
      className
    )}
    onClick={close}
  >
    <IconX size={24} />
  </button>

}

export default ModalCloseButton