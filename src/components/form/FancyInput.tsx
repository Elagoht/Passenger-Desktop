import { IconCopy } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, InputHTMLAttributes, ReactElement, useState } from "react"

interface IFancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: ReactElement
  noCopy?: boolean
}

const FancyInput: FC<IFancyInputProps> = ({ icon, label, noCopy, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false)

  return <label className={classNames({
    "flex text-lg items-center pl-2 gap-2 rounded-md": true,
    "bg-white dark:bg-tuatara-800 transition-all ease-in-out": focused && !props.disabled && !props.readOnly,
    "text-tuatara-500": props.disabled || props.readOnly,
  })}>
    <span className="sr-only">
      {label}
    </span>

    <div className="shrink-0">
      {icon}
    </div>

    <input
      {...props}
      disabled={props.disabled}
      className={classNames({
        "py-2 bg-transparent outline-none w-full placeholder:text-tuatara-500": true,
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

    {props.value && !props.disabled && !props.readOnly && !noCopy &&
      <button
        onClick={() => props.value
          && navigator.clipboard.writeText(String(props.value))
        }
        className="p-2 rounded-md shrink-0 hover:bg-gray-200 dark:hover:bg-tuatara-800 transition-all"
      >
        <IconCopy />
      </button>
    }
  </label>
}

export default FancyInput
