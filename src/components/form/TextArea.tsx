import { IconAlertCircle, IconCheck } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, ReactNode, TextareaHTMLAttributes, useEffect, useRef, useState } from "react"

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  optional?: boolean
  error?: string | boolean | string[]
  success?: string | boolean
  message?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  validityIcons?: boolean
}

const TextArea: FC<ITextAreaProps> = ({
  optional = false, label, error, success,
  message, iconLeft, iconRight, validityIcons,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(Boolean(props.value))
  const selfRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsFilled(Boolean(props.value))
  }, [props.value])

  return (
    <div className={classNames({
      "flex flex-col gap-0.5": true,
      "text-gray-500": !isFocused && !error && !success,
      "text-blue-500":
        isFocused && !error && !success && !props.disabled && !props.readOnly,
      "text-green-500": success && !error && !props.disabled && !props.readOnly,
      "text-red-500": error && !props.disabled && !props.readOnly,
      "opacity-75": props.disabled || props.readOnly,
    })} >
      {optional &&
        <small className="text-xs text-blue-500 ml-2">
          (optional)
        </small>
      }

      <label className="flex items-start gap-2 relative rounded-md transition-all duration-300 ease-in-out p-2 border border-current">
        <span className={classNames({
          "absolute transition-all duration-300 ease-in-out select-none line-clamp-1":
            true,
          "left-2": !iconLeft,
          "left-10": iconLeft,
          "right-2": !iconRight && !validityIcons,
          "right-10": iconRight || validityIcons,
          "top-1.5": !isFocused && !isFilled,
          "top-1 text-xs": isFocused || isFilled,
        })}>
          {label}
        </span>

        {iconLeft}

        <textarea
          {...props}
          ref={selfRef}
          className={classNames({
            "bg-transparent min-h-20 pt-2.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 h-10": true,
            "opacity-0": !isFocused && !isFilled,
          })}
          value={props.value}
          onFocus={(event) => {
            props.disabled || props.readOnly || setIsFocused(true)
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            props.disabled || props.readOnly || setIsFocused(false)
            props.onBlur?.(event)
          }}
          onChange={(event) => {
            setIsFilled(event.currentTarget.value.length > 0)
            props.onChange?.(event)
          }}
        />

        {validityIcons
          ? error
            ? <IconAlertCircle size="32" />
            : success
              ? <IconCheck size="32" />
              : iconRight
          : iconRight
        }
      </label>

      {(error ?? success ?? message) && (
        <small className="ml-2 text-xs">
          {error ?? success ?? message}
        </small>
      )}
    </div>
  )
}

export default TextArea
