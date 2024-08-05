"use client"

import Pretty from "@/helpers/prettiers"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react"
import InputErrorMessages from "./partial/InputErrorMessages"
import InputLeftIcon from "./partial/InputLeftIcon"
import InputValidityIcons from "./partial/InputValidityIcons"

export type IInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & ICustomInputProps & {
  type?:
  | "text"
  | "password"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "number"
  | "email"
  | "tel"
  | "url"
  | "search"
}

const Input: FC<IInputProps> = ({
  type = "text", optional = false,
  label, error, success, message,
  iconLeft, iconRight, validityIcons,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(Boolean(props.value))
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const selfRef = useRef<HTMLInputElement>(null)

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
    "text-blue-500": isFocused && !error && !success && !props.disabled && !props.readOnly,
    "text-green-500": success && !error && !props.disabled && !props.readOnly,
    "text-red-500": error && !props.disabled && !props.readOnly,
    "opacity-75": props.disabled || props.readOnly,
  })}>
    {optional &&
      <small className="text-xs text-blue-500 ml-2">
        (Optional)
      </small>
    }

    <label className="flex items-center gap-2 relative rounded-md transition-all duration-300 ease-in-out px-2 border border-current">
      <span className={classNames({
        "absolute transition-all duration-300 ease-in-out select-none line-clamp-1": true,
        "left-2": !iconLeft,
        "left-10": iconLeft,
        "right-2": !iconRight && !validityIcons && type !== "password",
        "right-10": iconRight || validityIcons || type === "password",
        "top-2": !isFocused && !isFilled,
        "top-0.5 text-xs": isFocused || isFilled,
      })}>
        {label}
      </span>

      <InputLeftIcon iconLeft={iconLeft} />

      <input
        {...props}
        ref={selfRef}
        type={(type === "password" && showPassword)
          ? "text"
          : type
        }
        className={classNames({
          "bg-transparent pt-3.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 h-10 transition-all duration-300 ease-in-out": true,
          "opacity-0": !isFocused && !isFilled,
          "pl-8 -ml-8": ["date", "time", "datetime-local", "month", "week"].includes(type),
          [props.className ?? ""]: true,
        })}
        defaultValue={props.defaultValue
          ? type === "tel"
            ? Pretty.phoneNumber((props.defaultValue as string).slice(-10))
            : props.defaultValue
          : undefined
        }
        value={
          typeof props.value === "string"
            ? type === "tel"
              ? Pretty.phoneNumber(props.value.slice(-10))
              : props.value
            : undefined
        }
        onFocus={(event) => {
          props.disabled || props.readOnly || setIsFocused(true)
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          props.disabled || props.readOnly || setIsFocused(false)
          props.onBlur?.(event)
        }}
        onClick={(event) => {
          props.onClick?.(event)
          event.currentTarget.showPicker?.()
        }}
        onChange={(event) => {
          setIsFilled(event.currentTarget.value.length > 0)
          if (type === "tel") event.target.value = Pretty.phoneNumber(event.target.value)
          props.onChange?.({
            ...event,
            target: {
              ...event.target,
              name: event.target.name,
              value: event.target.value
                .replace(/\D/g, "")
                .substring(0, 10)
            }
          })
          props.onChange?.(event)
        }}
      />

      {type === "password"
        ? <button
          type="button" // Prevents form submission
          onClick={() => {
            setShowPassword((prev) => !prev)
            selfRef.current?.focus()
          }}
        >
          {showPassword
            ? <IconEye size="32" />
            : <IconEyeOff size="32" />}
        </button>
        : <InputValidityIcons
          error={Boolean(error)}
          success={Boolean(success)}
          validityIcons={validityIcons ?? true}
          iconRight={iconRight}
        />
      }
    </label>

    <InputErrorMessages
      error={error}
      success={success}
      message={message}
    />
  </div>
}

export default Input