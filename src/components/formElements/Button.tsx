import classNames from "classnames"
import { ButtonHTMLAttributes, FC, ReactNode } from "react"

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: "default" | "ghost" | "text"
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark"
}

const Button: FC<IButtonProps> = ({
  leftIcon, rightIcon, variant = "default",
  color = "primary", ...props
}) => {
  return (
    <button {...props}
      className={classNames({
        "flex items-center justify-between gap-2 rounded-lg p-2 transition-all": true,
        "hover:ring-2 focus:ring-2 active:ring-1 ring-current w-full border-1 border border-current": variant !== "text",
        "hover:underline": variant === "text",
        "bg-opacity-0": variant !== "default",
        "cursor-not-allowed opacity-50": props.disabled,
        "bg-creamcan-500 dark:text-creamcan-50 text-creamcan-950": variant === "default" && color === "primary",
        "bg-leaf-500 dark:text-leaf-50 text-leaf-950": variant === "default" && color === "secondary",
        "bg-rose-500 dark:text-rose-50 text-rose-950": variant === "default" && color === "danger",
        "bg-emerald-500 dark:text-emerald-50 text-emerald-950": variant === "default" && color === "success",
        "bg-orange-500 dark:text-orange-50 text-orange-950": variant === "default" && color === "warning",
        "bg-cyan-500 dark:text-cyan-50 text-cyan-950": variant === "default" && color === "info",
        "bg-tuatara-950 text-tuatara-50": variant === "default" && color === "dark",
        "bg-white dark:text-tuatara-50 text-tuatara-950": variant === "default" && color === "light",
        "bg-transparent text-creamcan-500": color === "primary" && variant !== "default",
        "bg-transparent text-leaf-500": color === "secondary" && variant !== "default",
        "bg-transparent text-rose-500": color === "danger" && variant !== "default",
        "bg-transparent text-emerald-500": color === "success" && variant !== "default",
        "bg-transparent text-orange-500": color === "warning" && variant !== "default",
        "bg-transparent text-cyan-500": color === "info" && variant !== "default",
        "bg-transparent text-tuatara-950": color === "dark" && variant !== "default",
        "bg-transparent text-tuatara-50": color === "light" && variant !== "default",
        [props.className!]: props.className
      })}
    >
      {leftIcon}

      <span className="flex-1" >
        {props.children}
      </span>

      {rightIcon}
    </button>
  )
}

export default Button
