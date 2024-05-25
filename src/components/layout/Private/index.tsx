import { FC } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"
import { useAuthorizationSlice } from "../../../stores/authorization"
import GuideSwiper from "../../(guide)/GuideSwiper"
import ReAuthModal from "../../(auth)/ReAuthModal"

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
