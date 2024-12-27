import Loading from "@/components/layout/Loading"
import Window from "@/components/layout/Window"
import AverageLength from "@/components/windows/dashboard/AverageLength"
import MostAccessed from "@/components/windows/dashboard/MostAccessed"
import MostUsedPassphrase from "@/components/windows/dashboard/MostUsedPassphrase"
import StrengthDistributionChart from "@/components/windows/dashboard/StrengthDistributionChart"
import StrengthMeter from "@/components/windows/dashboard/StrengtMeter"
import TotalCounts from "@/components/windows/dashboard/TotalCounts"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { useAuth } from "@/hooks/authorization"
import { getStatistics } from "@/services/reportServices"
import { FC, useEffect, useState } from "react"

const WinDashboard: FC = () => {
  const [statistics, setStatistics] = useState<Maybe<Statistics>>(null)

  useEffect(() => {
    getStatistics(
      useAuth()
    ).then((response) => handleResponse(
      response,
      [() => setStatistics(StringHelper.deserialize<Statistics>(
        response.stdout
      ))],
      [() => void 0, {
        errorTitle: "Couldn't fetch statistics at the moment",
        errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr)
      }]
    ))
  }, [])

  if (!statistics) return <Loading />

  return <Window wide>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3
      gap-2 md:gap-4"
    >
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