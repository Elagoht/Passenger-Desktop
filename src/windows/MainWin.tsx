import { FC } from "react"
import PassphraseListModal from "../components/PassphraseListModal"
import StatisticsSwiper from "../components/Statistics"

const MainWin: FC = () => {
  return <section>
    <StatisticsSwiper />

    <PassphraseListModal />
  </section>
}

export default MainWin
