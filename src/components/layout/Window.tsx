import classNames from "classnames"
import { motion } from "framer-motion"
import { FC, ReactNode } from "react"

interface IWindowProps {
  className?: string
  title?: string
  description?: string
  children: ReactNode
  wide?: boolean
  center?: boolean
}

const Window: FC<IWindowProps> = ({ children, title, description, className, wide, center }) => {
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
    className={classNames({
      "flex flex-col": true,
      "p-2 md:p-4": !center,
      "justify-center h-screen": center,
      "max-w-2xl mx-auto": !wide,
      [className!]: className
    })}
  >
    {title &&
      <h1 className="text-3xl font-medium text-center mt-4">
        {title}
      </h1>
    }

    {
      description &&
      <p className="my-2">
        {description}
      </p>
    }

    {children}
  </motion.main >
}

export default Window
