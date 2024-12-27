import BarChart from "@/components/charts/BarChart"
import Strength from "@/helpers/strength"
import { FC } from "react"
import { LENGTH_PENALTY } from "./StrengtMeter"

interface IStrengthDistributionChartProps {
  strengths: Statistics["strengths"]
}

const StrengthDistributionChart: FC<IStrengthDistributionChartProps> = ({
  strengths
}) => {
  const data = Array.from({ length: 11 }, (_, index) => ({
    label: index.toString(),
    value: Object.keys(strengths).filter(key =>
      strengths[key] === index + LENGTH_PENALTY
    ).length
  }))

  const colors = Array.from({ length: 11 }, (_, index) =>
    Strength.color(index + LENGTH_PENALTY)
  )

  return <article className="rounded-xl p-4 lg:col-span-2 lg:row-span-2
    shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50
    dark:bg-tuatara-900"
  >
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