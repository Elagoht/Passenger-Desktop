import NavBar from "@/components/layout/NavBar"
import ReAuthModal from "@/components/ReAuthModal"
import { FC } from "react"
import { Outlet } from "react-router-dom"

const Private: FC = () => {
  return <main className="flex flex-col md:flex-row-reverse">
    <div className="flex-1 max-md:mb-14">
      <Outlet />
    </div>

    <NavBar />

    <ReAuthModal />
  </main>
}

export default Private
