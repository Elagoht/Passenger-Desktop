"use client"

import { ICustomInputProps } from "@/types/inputs"
import classNames from "classnames"
import { FC, InputHTMLAttributes } from "react"
import InputErrorMessages from "./partial/InputErrorMessages"
import InputLeftIcon from "./partial/InputLeftIcon"
import InputValidityIcons from "./partial/InputValidityIcons"

export type IInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & ICustomInputProps

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
      <InputLeftIcon iconLeft={iconLeft} />

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

        <InputValidityIcons
          error={Boolean(error)}
          success={Boolean(success)}
          validityIcons={validityIcons ?? true}
          iconRight={iconRight}
        />
      </div>
    </label>

    <InputErrorMessages
      error={error}
      success={success}
      message={message}
    />
  </div>
}

export default Input
