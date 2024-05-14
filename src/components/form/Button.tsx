import classNames from "classnames"
import { ButtonHTMLAttributes, FC, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: "default" | "ghost" | "text"
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark"
}

const Button: FC<ButtonProps> = ({
  leftIcon, rightIcon, variant = "default", color = "primary", ...props }) => {
  return (
    <button {...props}
      className={classNames({
        "flex items-center justify-between gap-2 rounded-lg p-2 transition-all": true,
        "cursor-not-allowed opacity-50": props.disabled,
        "bg-creamcan-500 text-creamcan-800": variant === "default" && color === "primary",
        "bg-leaf-500 text-leaf-800": variant === "default" && color === "secondary",
        "bg-rose-500 text-rose-800": variant === "default" && color === "danger",
        "bg-emerald-500 text-emerald-800": variant === "default" && color === "success",
        "bg-orange-500 text-orange-800": variant === "default" && color === "warning",
        "bg-cyan-500 text-cyan-800": variant === "default" && color === "info",
        "bg-tuatara-500 text-tuatara-800": variant === "default" && color === "dark",
        "bg-tuatara-100 text-tuatara-800": variant === "ghost" && color === "dark",
      })}
    >
      {leftIcon}

      <span className="flex-1">
        {props.children}
      </ span>

      {rightIcon}
    </button>
  )
}

export default Button
