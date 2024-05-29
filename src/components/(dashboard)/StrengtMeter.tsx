import "chart.js/auto"
import { FC } from "react"
import Strength from "../../helpers/strength"
import GaugeChart from "../statistics/GauceChart"
import { Statistics } from "../../types/statistics"

interface IStrengthMeterProps {
  averageStrength: Statistics["averageStrength"]
}

const StrengthMeter: FC<IStrengthMeterProps> = ({ averageStrength }) => {
  const average = !isNaN(averageStrength)
    ? averageStrength
    : -2

  return <figure className="flex flex-col items-center justify-center rounded-xl p-4 shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900">
    <div className="max-sm:max-w-56">
      <GaugeChart
        value={averageStrength}
        minValue={-2}
        maxValue={8}
        fillColor={Strength.color(average)}
        title={<h2 className="text-7xl font-medium" style={{ color: Strength.color(average) }}>{Math.round(average + 2)}</h2>}
        subtitle={<h3 className="text-tuatara-500 w-40">{Strength.calculatedMessage(average)}</h3>}
      />
    </div>

    <figcaption className="text-xl text-creamcan-500 font-bold">
      Average Strength
    </figcaption>
  </figure>
}

export default StrengthMeter
