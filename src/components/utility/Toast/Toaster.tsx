import { toastStore } from "@/lib/stores/notification"
import { AnimatePresence } from "framer-motion"
import { FC } from "react"
import Toast from "."

const Toaster: FC = () => {
  const notifications = toastStore(state => state.toasts)

  return <div
    role="presentation"
    aria-live="polite"
    aria-atomic="true"
    aria-relevant="removals additions"
    className="fixed inset-0 z-50 md:p-2 md:gap-2 pointer-events-none
    flex flex-col items-end"
  >
    <AnimatePresence mode="sync">
      {notifications.map(notification =>
        <Toast
          {...notification}
          key={notification.id}
        />
      )}
    </AnimatePresence>
  </div>
}

export default Toaster
