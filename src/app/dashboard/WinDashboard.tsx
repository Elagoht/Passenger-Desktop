import Window from "@/components/layout/Window"
import AverageLength from "@/components/windows/dashboard/AverageLength"
import MostAccessed from "@/components/windows/dashboard/MostAccessed"
import MostUsedPassphrase from "@/components/windows/dashboard/MostUsedPassphrase"
import StrengthDistributionChart from "@/components/windows/dashboard/StrengthDistributionChart"
import StrengthMeter from "@/components/windows/dashboard/StrengtMeter"
import TotalCounts from "@/components/windows/dashboard/TotalCounts"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { getStatistics } from "@/services/reportServices"
import { Statistics } from "@/types/statistics"
import { FC, useEffect, useState } from "react"

const WinDashboard: FC = () => {
  const accessToken = authStore(state => state.accessToken)
  const [statistics, setStatistics] = useState<Statistics>({
    totalCount: 0, // Used
    averageLength: 0, // Used
    uniquePlatforms: [],
    uniquePlatformsCount: 0, // Used
    uniquePassphrases: 0, // Used
    mostAccessed: [], // Used
    commonByPlatform: [],
    percentageOfCommon: 0, // Used
    mostCommon: "", // Used
    strengths: {},
    averageStrength: -2, // Used
    weakPassphrases: [],
    mediumPassphrases: [],
    strongPassphrases: []
  }) // This is a placeholder for initial state

  useEffect(() => {
    getStatistics(
      accessToken
    ).then((response) => handleResponse(
      response,
      [() => setStatistics(StringHelper.deserialize<Statistics>(response.stdout))],
      [() => void 0, {
        errorTitle: "Couldn't fetch statistics at the moment",
        errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr)
      }],
    ))
  }, [])

  return <Window wide>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
      <TotalCounts
        totalCount={statistics.totalCount}
        uniqueCount={statistics.uniquePassphrases}
        uniquePlatformsCount={statistics.uniquePlatformsCount}
        percentageOfCommon={statistics.percentageOfCommon}
      />

      <StrengthMeter averageStrength={statistics.averageStrength} />

      <AverageLength averageLength={statistics.averageLength} />

      <MostAccessed mostAccessed={statistics.mostAccessed} />

      <StrengthDistributionChart strengths={statistics.strengths} />

      <MostUsedPassphrase mostCommon={statistics.mostCommon} />
    </div>
  </Window>
}

export default WinDashboard