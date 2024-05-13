import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"

const Private: FC = () => {
  return <main>
    <Outlet />

    <NavBar />
  </main>
}

export default Private
