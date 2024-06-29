"use client"

import { Icon, IconAlertCircle, IconCheck, IconProps } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, ForwardRefExoticComponent, ReactNode, SelectHTMLAttributes, createElement, useEffect, useState } from "react"

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  optional?: boolean
  error?: ReactNode | boolean | string[]
  success?: ReactNode | boolean
  message?: ReactNode
  iconLeft?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  iconRight?: ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  validityIcons?: boolean
}

const Select: FC<ISelectProps> = ({
  optional = true,
  label, error, success, message,
  iconLeft, iconRight, validityIcons,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(Boolean(props.value))

  useEffect(
    () => setIsFilled(
      Boolean(props.value) ||
      Boolean(props.defaultValue)
    ),
    [props.value, props.defaultValue]
  )

  return <div className={classNames({
    "flex flex-col gap-0.5": true,
    "text-gray-500": !isFocused && !error && !success,
    "text-blue-500": isFocused && !error && !success && !props.disabled,
    "text-green-500": success && !error && !props.disabled,
    "text-red-500": error && !props.disabled,
    "opacity-75": props.disabled,
  })}>
    <label
      className="flex items-center gap-2 relative rounded-md transition-all duration-300 ease-in-out px-2 border border-current"
    >
      <span className={classNames({
        "absolute transition-all duration-300 ease-in-out select-none line-clamp-1": true,
        "left-2": !iconLeft,
        "left-10": iconLeft,
        "top-2": !isFocused && !isFilled,
        "top-0.5 text-xs": isFocused || isFilled,
      })}>
        {label}
      </span>

      {iconLeft && createElement(iconLeft, {
        size: 32,
        className: "traansition-all duration-300 ease-in-out"
      })}

      <select
        {...props}
        className={classNames({
          "bg-transparent pt-3.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 h-10 transition-all duration-300 ease-in-out appearance-none": true,
          "opacity-0": !isFocused && !isFilled,
          [props.className ?? ""]: true,
        })}
        onFocus={(event) => {
          props.disabled || setIsFocused(true)
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          props.disabled || setIsFocused(false)
          props.onBlur?.(event)
        }}
        onChange={(event) => {
          setIsFilled(event.currentTarget.value.length > 0)
          props.onChange?.(event)
        }}
      >
        {optional &&
          <option value="">Select...</option>}
        {props.children}
      </select>

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
    </label>

    {(error || success || message) &&
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

export default Select