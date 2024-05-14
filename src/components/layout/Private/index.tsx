import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"

const Private: FC = () => {
  return <main className="flex flex-col md:flex-row-reverse h-screen w-screen">
    <Outlet />

    <NavBar />
  </main>
}

export default Private
