import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "@/components/layout/NavBar"
import { authStore } from "@/lib/stores/authorization"
import ReAuthModal from "@/components/ReAuthModal"
import GuideSwiper from "@/components/GuideSwiper"

const Private: FC = () => {
  const isGuideDone = authStore(state => state.isGuideDone)

  return <main className="flex flex-col md:flex-row-reverse">
    <div className="flex-1 max-md:mb-14">
      <Outlet />
    </div>

    <NavBar />

    {!isGuideDone && <GuideSwiper />}

    <ReAuthModal />
  </main>
}

export default Private
