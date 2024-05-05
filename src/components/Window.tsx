/**
 * This components do not open a new window,
 * but it is a window that can be used to
 * display on top of the main window.
 */

import { IconChevronLeft, IconDotsVertical } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { FC } from "react"
import { useWindowSlice } from "../stores/window"

interface IWindowProps {
  title: string
}

const animation = {
  hidden: {
    x: "-100%",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    x: "-100%",
    opacity: 0
  }
}

const Window: FC<IWindowProps> = ({ title }) => {
  const closeWindow = useWindowSlice((state) => state.closeWindow)

  return <motion.section
    variants={animation}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="fixed inset-0 background"
  >
    <header className=" flex p-2 items-center gap-4 window">
      <button
        onClick={closeWindow}
        className="hover:bg-tuatara-100 p-2 rounded-full transition-all"
      >
        <IconChevronLeft />
      </button>

      <h1 className="flex-1 font-medium text-center">
        {title}
      </h1>

      <button className="hover:bg-tuatara-100 p-2 rounded-full transition-all">
        <IconDotsVertical />
      </button>
    </header>
  </motion.section>
}

export default Window