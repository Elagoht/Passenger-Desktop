import Button, { IButtonProps } from "@/components/formElements/Button"
import classNames from "classnames"
import { FC, ReactNode } from "react"
import ModalCloseButton from "./ModalCloseButton"

interface IModalProps {
  isOpen: boolean
  close: () => void
  persist?: boolean
  title?: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  buttons?: SingleOrMore<IButtonProps>
}

const Modal: FC<IModalProps> = ({
  children, close, persist, title, isOpen, size = "md", buttons
}) =>
  <div
    className={classNames({
      "fixed inset-0 z-50 flex md:items-center items-end justify-center bg-black bg-opacity-50 backdrop-blur-3xl md:p-8 transition-all ease-in-out duration-300": true,
      "opacity-0 pointer-events-none": !isOpen,
    })}
    onClick={persist
      ? undefined
      : close
    }
  >
    <div
      role="dialog"
      aria-modal="true"
      className={classNames({
        "bg-tuatara-100 dark:bg-tuatara-900 sm:rounded-lg rounded-t-lg shadow-lg flex flex-col transition-all ease-in-out duration-300 w-full": true,
        "translate-y-full": !isOpen,
        "max-sm:delay-200": isOpen,
        "max-w-screen-sm": size === "sm",
        "max-w-screen-md": size === "md",
        "max-w-screen-lg": size === "lg",
        "max-w-screen-xl": size === "xl",
      })}
      onClick={(event) => event.stopPropagation()}
    >
      {title
        ? <header className="p-2 text-lg font-medium flex justify-between items-center shadow-md">
          <h2>{title}</h2>

          {!persist && <ModalCloseButton close={close} />}
        </header>
        : !persist && <ModalCloseButton
          close={close}
          className="absolute top-2 right-2"
        />
      }

      <article className="p-2 grow overflow-auto">
        {children}
      </article>

      {buttons &&
        <footer>
          <div className="flex justify-end gap-2 p-2">
            {buttons instanceof Array
              ? buttons
                .map((button, index) =>
                  <Button
                    key={index}
                    type="button" // Prevent form submission by default
                    {...button}
                  />
                )
              : <Button {...buttons} />
            }
          </div>
        </footer>
      }
    </div>
  </div>

export default Modal
