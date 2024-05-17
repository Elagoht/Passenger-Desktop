import { IconCircleX } from "@tabler/icons-react"
import classNames from "classnames"
import { motion } from "framer-motion"
import { FC, useEffect } from "react"
import { IToast, useNotificationSlice } from "../../../stores/notification"

const Toast: FC<IToast> = ({
  message, type, buttons, clickToClose,
  icon, title, duration, persistant, id
}) => {
  const removeNotification = useNotificationSlice(state => state.removeNotification)

  useEffect(() => {
    if (!duration || persistant) return

    const timer = setTimeout(() =>
      removeNotification(id),
      duration
    )

    return () => clearTimeout(timer)
  }, [])

  return <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, marginTop: "-5rem" }}
    role="alertdialog"
    aria-live="assertive"
    aria-atomic="true"
    aria-relevant="all"
    aria-modal="true"
    aria-label="Notification"
    id={id}
    className={
      classNames({
        "md:p-2 p-1 bg-white dark:bg-tuatara-800 text-black dark:text-white flex md:gap-2 gap-1 items-start border-b-4 md:rounded-lg shadow-md pointer-events-auto md:max-w-72 w-full": true,
        "border-leaf-500": type === "success",
        "border-creamcan-500": type === "warning",
        "border-rose-500": type === "error",
        "border-sky-500": type === "info",
        "cursor-pointer": clickToClose,
      })}
    onClick={clickToClose
      ? () => removeNotification(id)
      : undefined
    }
  >
    {icon &&
      <figure className="flex-shrink-0">
        {icon}
      </figure>
    }

    <article className="flex-grow pl-2">
      {title &&
        <h1 className="font-semibold">{title}</h1>
      }

      <p>{message}</p>

      {buttons &&
        <div className="flex justify-end mt-2">
          {buttons.map((button, index) =>
            <button
              key={index}
              onClick={button.action}
              className={classNames({
                "px-2 py-1 rounded-md flex items-center gap-2": true,
                "bg-leaf-500 text-white": button.type === "success",
                "bg-creamcan-500 text-white": button.type === "warning",
                "bg-rose-500 text-white": button.type === "error",
                "bg-sky-500 text-white": button.type === "info",
              })}
            >
              <figure className="shrink-0">{button.icon}</figure>

              <span className="grow shrink-0 text-left">{button.label}</span>
            </button>
          )}
        </div>
      }
    </article>

    {
      persistant &&
      <button onClick={() => removeNotification(id)}>
        <IconCircleX size={24} />
      </button>
    }
  </motion.div>
}

export default Toast