import "chart.js/auto"
import { FC } from "react"
import Statistics from "../../helpers/statistics"
import Strength from "../../helpers/strength"
import GaugeChart from "../statistics/GauceChart"

interface IStrengthMeterProps {
  statistics: Statistics
}

const StrengthMeter: FC<IStrengthMeterProps> = ({ statistics }) => {
  const averageStrength = statistics.averageStrength()

  return <figure className="flex flex-col items-center justify-center rounded-xl p-4 shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900">
    <GaugeChart
      value={averageStrength}
      minValue={-2}
      maxValue={8}
      fillColor={Strength.color(averageStrength)}
      title={<h2 className="text-7xl font-medium drop-shadow-text" style={{ color: Strength.color(averageStrength) }}>{averageStrength + 2}</h2>}
      subtitle={<h3 className="text-tuatara-500 w-40 drop-shadow-text">{Strength.calculatedMessage(averageStrength)}</h3>}
    />

    <figcaption className="text-xl text-tuatara-500 font-bold">Average Strength</figcaption>
  </figure>
}

export default StrengthMeter
