import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "@/components/layout/NavBar"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import ReAuthModal from "@/components/ReAuthModal"
import GuideSwiper from "@/components/GuideSwiper"

const Private: FC = () => {
  const isGuideDone = useAuthorizationSlice(state => state.isGuideDone)

  return <main className="flex flex-col md:flex-row-reverse h-screen w-screen">
    <Outlet />

    <NavBar />

    {!isGuideDone && <GuideSwiper />}

    <ReAuthModal />
  </main>
}

export default Private
