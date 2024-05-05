import { FC } from "react"
import { useWindowSlice } from "../stores/window"
import Window from "./Window"
import { AnimatePresence, motion } from "framer-motion"

const animation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0
  }
}

const WindowMachine: FC = () => {
  const windowHistory = useWindowSlice((state) => state.windowHistory)

  return <motion.aside
    className="fixed inset-0"
    variants={animation}
    initial="hidden"
    exit="exit"
    animate="visible"
  >
    <AnimatePresence>
      {windowHistory.map((window) => (
        <Window
          key={window.id}
          title={window.title}
        />
      ))}
    </AnimatePresence>
  </motion.aside>
}

export default WindowMachine