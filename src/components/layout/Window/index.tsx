import { motion } from "framer-motion"
import { FC, ReactNode } from "react"

interface IWindowProps {
  children: ReactNode
}

const Window: FC<IWindowProps> = ({ children }) => {
  return <motion.main
    initial="initial"
    animate="in"
    exit="out"
    variants={{
      initial: {
        opacity: 0,
        scale: 0.9
      },
      in: {
        opacity: 1,
        scale: 1
      },
      out: {
        opacity: 0,
        scale: 0.9
      }
    }}
    transition={{
      type: "spring",
      ease: "anticipate",
      duration: 0.25
    }}
    className="fixed top-0 left-0 right-0 bottom-[5.25rem]"
  >
    {children}
  </motion.main>
}

export default Window
