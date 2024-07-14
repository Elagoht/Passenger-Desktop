import { FC } from "react"
import { Outlet } from "react-router-dom"

const Public: FC = () => {
  return <main>
    <Outlet />
  </main>
}

export default Public
