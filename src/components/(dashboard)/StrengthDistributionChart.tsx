import { FC } from "react"
import { Statistics } from "../../types/statistics"
import Strength from "../../helpers/strength"
import BarChart from "../statistics/BarChart"

interface IStrengthDistributionChartProps {
  strengths: Statistics["strengths"]
}

const StrengthDistributionChart: FC<IStrengthDistributionChartProps> = ({ strengths }) => {

  // Calculate quantities of each strength of passphrases from 0 to 10
  const data = Array.from({ length: 11 }, (_, index) => ({
    label: index.toString(),
    value: Object.keys(strengths).filter(key => strengths[key] === index).length
  }))

  const colors = Array.from({ length: 11 }, (_, index) => Strength.color(index))

  return <article className="rounded-xl p-4 shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900">
    <h2 className="text-lg font-semibold text-creamcan-500 mb-3">
      Strength Distribution
    </h2>

    <BarChart
      data={data}
      colors={colors}
      axisNames={["Strength", "Frequency"]}
    />
  </article>
}

export default StrengthDistributionChart