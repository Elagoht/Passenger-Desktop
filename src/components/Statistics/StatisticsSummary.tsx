import "chart.js/auto"
import { FC } from "react"
import Statistics from "../../helpers/statistics"
import Strength from "../../helpers/strength"
import GaugeChart from "./charts/GauceChart"

interface IStatisticsSummaryProps {
  statisticsManager: Statistics
}

const StatisticsSummary: FC<IStatisticsSummaryProps> = ({ statisticsManager }) => {
  const averageStrength = statisticsManager.averageStrength()

  return <header className="flex flex-col items-center justify-center">
    <figure className="-mb-10">
      <GaugeChart
        value={averageStrength}
        minValue={-2}
        maxValue={8}
        fillColor={Strength.color(averageStrength)}
        title={<h2><strong className="text-creamcan-500">Average Strength:</strong> {averageStrength}</h2>}
        subtitle={<h3 className="text-tuatara-500">{Strength.calculatedMessage(averageStrength)}</h3>}
      />
    </figure>

    <table className="table-auto">
      <thead>
        <tr>
          <th
            className="px-4 py-2 font-normal"
            colSpan={2}
          >
            <strong className="text-leaf-500">Total Entries:</strong> {statisticsManager.totalCount()}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="px-2">
            <strong className="text-creamcan-500">Unique Platforms:</strong> {statisticsManager.uniquePlatforms().length}
          </td>

          <td className="px-2">
            <strong className="text-creamcan-500">Unique Passphrases:</strong> {statisticsManager.uniqueCount()}
          </td>
        </tr>
      </tbody>
    </table>
  </header>
}

export default StatisticsSummary
