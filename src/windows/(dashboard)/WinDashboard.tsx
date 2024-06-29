import { FC, useEffect, useState } from "react"
import Service from "../../services"
import MostAccessed from "../../components/(dashboard)/MostAccessed"
import StrengthMeter from "../../components/(dashboard)/StrengtMeter"
import TotalCounts from "../../components/(dashboard)/TotalCounts"
import Window from "../../components/layout/Window"
import StringHelper from "../../helpers/string"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import { Statistics } from "../../types/statistics"
import MostUsedPassphrase from "../../components/(dashboard)/MostUsedPassphrase"
import AverageLength from "../../components/(dashboard)/AverageLength"
import StrengthDistributionChart from "../../components/(dashboard)/StrengthDistributionChart"

const WinDashboard: FC = () => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

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
    Service.stats(
      accessToken
    ).then((response) => response.status === 0
      ? setStatistics(StringHelper.deserialize<Statistics>(response.stdout))
      : addNotification({
        type: "error",
        title: "Unsuccessful Request",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
    )
  }, [])

  return <Window>
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