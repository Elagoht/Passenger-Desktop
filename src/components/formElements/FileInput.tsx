"use client"

import { Icon, IconAlertCircle, IconCheck, IconProps } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, ForwardRefExoticComponent, InputHTMLAttributes, ReactNode, createElement } from "react"

export interface IInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string
  optional?: boolean
  error?: ReactNode | boolean | string[]
  success?: ReactNode | boolean
  message?: ReactNode
  iconLeft?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  iconRight?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  validityIcons?: boolean
}

const Input: FC<IInputProps> = ({
  optional = false,
  label, error, success, message,
  iconLeft, iconRight, validityIcons,
  ...props
}) => {
  return <div className={classNames({
    "flex flex-col gap-0.5": true,
    "text-gray-500": !error && !success,
    "text-green-500": success && !error && !props.disabled && !props.readOnly,
    "text-red-500": error && !props.disabled && !props.readOnly,
    "opacity-75": props.disabled || props.readOnly,
  })}>
    {optional &&
      <small className="text-xs text-blue-500 ml-2">
        (Optional)
      </small>
    }

    <label className="flex items-center gap-2 rounded-md transition-all duration-300 ease-in-out px-2 border border-current">
      {iconLeft && createElement(iconLeft, {
        size: 32,
        className: "transition-all duration-300 ease-in-out"
      })}

      <div className="flex flex-col py-1">
        <span className={classNames({
          "transition-all duration-300 leading-5 ease-in-out select-none line-clamp-1": true,
        })}>
          {label}
        </span>

        <input
          {...props}
          type="file"
          className={classNames({
            "bg-transparent w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 transition-all duration-300 ease-in-out": true,
            [props.className ?? ""]: true,
          })}
        />

        {validityIcons
          ? error
            ? <IconAlertCircle size="32" />
            : success
              ? <IconCheck size="32" />
              : iconRight && createElement(iconRight, {
                size: 32,
                className: "transition-all duration-300 ease-in-out"
              })
          : iconRight && createElement(iconRight, {
            size: 32,
            className: "transition-all duration-300 ease-in-out"
          })
        }
      </div>
    </label>

    {
      (error || success || message) &&
      <small className="ml-2 text-xs">
        {typeof error === "string"
          ? error
          : typeof success === "string"
            ? success
            : message
        }
      </small>
    }
  </div>
}

export default Input
