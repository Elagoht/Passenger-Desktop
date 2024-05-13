import { FC } from "react"
import NavBar from "../components/layout/NavBar"
import Window from "../components/layout/Window"

import Statistics from "../helpers/statistics"
import { usePassphrasesSlice } from "../stores/passphrases"
import StatisticsSummary from "../components/(dashboard)/StatisticsSummary"

const WindowManager: FC = () => {
  const passphrases = usePassphrasesSlice(state => state.passphrases)
  const statisticsManager = new Statistics(passphrases)

  return <main>
    <NavBar />

    <Window>
      <StatisticsSummary
        statisticsManager={statisticsManager}
      />
    </Window>
  </main>
}

export default WindowManager
