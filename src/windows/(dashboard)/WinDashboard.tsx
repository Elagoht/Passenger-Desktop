import { FC, useEffect, useState } from "react"
import StrengthMeter from "../../components/(dashboard)/StrengtMeter"
import TotalCounts from "../../components/(dashboard)/TotalCounts"
import Window from "../../components/layout/Window"
import { Statistics } from "../../types/statistics"
import Commands from "../../api/cli"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import StringHelper from "../../helpers/string"

const WinDashboard: FC = () => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  const [statistics, setStatistics] = useState<Statistics>({
    totalCount: 0,
    averageLength: 0,
    uniquePlatforms: [],
    uniquePlatformsCount: 0,
    uniquePassphrases: 0,
    mostAccessed: [],
    commonByPlatform: [],
    percentageOfCommon: 0,
    mostCommon: "",
    strengths: {},
    averageStrength: 0,
    weakPassphrases: [],
    mediumPassphrases: [],
    strongPassphrases: []
  }) // This is a placeholder for initial state

  useEffect(() => {
    Commands.stats(
      accessToken
    ).then((response) => {
      if (!response.success) return addNotification({
        type: "error",
        title: "Unsuccessful Request",
        message: StringHelper.removeUnixErrorPrefix(response.output)
      })
      setStatistics(JSON.parse(response.output))
    })
  }, [])

  return <Window>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-4">
      <TotalCounts
        totalCount={statistics.totalCount}
        uniqueCount={statistics.uniquePassphrases}
        uniquePlatformsCount={statistics.uniquePlatformsCount}
      />

      <StrengthMeter averageStrength={statistics.averageStrength} />
    </div>
  </Window>
}

export default WinDashboard