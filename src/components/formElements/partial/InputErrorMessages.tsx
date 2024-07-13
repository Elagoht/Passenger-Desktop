import { FC, ReactNode } from "react"

interface IInputErrorMessagesProps {
  error?: ReactNode | boolean | string[]
  success?: ReactNode | boolean
  message?: ReactNode
}

const InputErrorMessages: FC<IInputErrorMessagesProps> = ({ error, message, success }) =>
  (error || success || message) &&
  <small className="ml-2 text-xs">
    {typeof error === "string"
      ? error
      : typeof success === "string"
        ? success
        : message
    }
  </small>

export default InputErrorMessages
