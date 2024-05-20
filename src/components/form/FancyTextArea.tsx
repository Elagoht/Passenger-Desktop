import classNames from "classnames"
import { FC, ReactElement, TextareaHTMLAttributes, useState } from "react"

interface IFancyTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  icon: ReactElement
}

const FancyTextArea: FC<IFancyTextAreaProps> = ({ label, icon, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false)

  return <label className={classNames({
    "flex text-lg items-start p-2 gap-2 rounded-md": true,
    "bg-white dark:bg-tuatara-900 transition-all ease-in-out": focused && !props.disabled && !props.readOnly,
    "text-tuatara-500": props.disabled || props.readOnly,
  })}>
    <span className="sr-only">
      {label}
    </span>

    {icon}

    <textarea
      {...props}
      disabled={props.disabled}
      className={classNames({
        "bg-transparent outline-none w-full min-h-20": true,
        "select-none": props.disabled || props.readOnly,
        [props.className!]: props.className,
      })}
      onFocus={(event) => {
        setFocused(true)
        props.onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocused(false)
        props.onBlur?.(event)
      }}
    />
  </label>
}

export default FancyTextArea
