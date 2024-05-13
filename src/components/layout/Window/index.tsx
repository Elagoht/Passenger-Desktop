import React, { FC, ReactNode } from "react"

interface IWindowProps {
  children: ReactNode
}

const Window: FC<IWindowProps> = ({ children }) => {
  return <section className="fixed top-0 left-0 right-0 bottom-[5.25rem]">
    {children}
  </section>
}

export default Window
