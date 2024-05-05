import { FC, ReactElement } from "react"
import { useWindowSlice } from "../stores/window"
import Window from "./Window"
import { AnimatePresence, motion } from "framer-motion"

const animation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

interface IWindowMachineProps {
  mainWin: ReactElement
}

const WindowMachine: FC<IWindowMachineProps> = ({ mainWin }) => {
  const windowHistory = useWindowSlice((state) => state.windowHistory)

  return <motion.aside
    className="fixed inset-0"
    variants={animation}
    initial="hidden"
    animate="visible"
  >
    {mainWin}

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