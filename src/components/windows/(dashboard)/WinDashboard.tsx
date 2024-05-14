import { FC } from "react"
import Window from "../../layout/Window"
import Statistics from "../../../helpers/statistics"
import { usePassphrasesSlice } from "../../../stores/passphrases"
import StrengthMeter from "../../(dashboard)/StrengtMeter"

const WinDashboard: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)

  const statistics = new Statistics(passphrases)

  return <Window>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <StrengthMeter statistics={statistics} />
    </div>
  </Window>
}

export default WinDashboard