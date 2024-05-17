import { FC } from "react"
import Window from "../../components/layout/Window"
import Statistics from "../../helpers/statistics"
import { usePassphrasesSlice } from "../../stores/passphrases"
import StrengthMeter from "../../components/(dashboard)/StrengtMeter"
import TotalCounts from "../../components/(dashboard)/TotalCounts"

const WinDashboard: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)

  const statistics = new Statistics(passphrases)

  return <Window>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
      <TotalCounts statistics={statistics} />

      <StrengthMeter statistics={statistics} />
    </div>
  </Window>
}

export default WinDashboard