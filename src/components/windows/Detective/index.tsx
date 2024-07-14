import Loading from "@/components/layout/Loading"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { getDetectiveReports } from "@/services/reportServices"
import { DetectiveReport } from "@/types/reports"
import { Maybe } from "@/types/utility"
import { IconZoomCancel } from "@tabler/icons-react"
import { ReactElement, useEffect, useState } from "react"
import DetectiveCommonPassphrases from "./detectiveReports/DetectiveCommonPassphrases"
import DetectiveOldPassphrases from "./detectiveReports/DetectiveOldPassphrases"
import DetectiveSimilarWithUsername from "./detectiveReports/DetectiveSimilarWithUsername"
import DetectiveWeakPassphrases from "./detectiveReports/DetectiveWeakPassphrases"

const Detective = () => {
  const accessToken = authStore(store => store.accessToken)

  const [detectiveReports, setDetectiveReports] = useState<Maybe<DetectiveReport>>(null)

  useEffect(() => {
    getDetectiveReports(
      accessToken
    ).then((response) => handleResponse(
      response,
      [() => setDetectiveReports(StringHelper.deserialize<DetectiveReport>(response.stdout))],
      [() => void 0, {
        errorTitle: "Error",
        errorIcon: IconZoomCancel,
      }]
    ))
  }, [])

  if (!detectiveReports) return <Loading />

  const reports: Record<keyof DetectiveReport, ReactElement> = {
    commonPassphrases: <DetectiveCommonPassphrases commonPassphrases={detectiveReports.commonPassphrases} />,
    similarWithUsername: <DetectiveSimilarWithUsername similarWithUsername={detectiveReports.similarWithUsername} />,
    weakPassphrases: <DetectiveWeakPassphrases weakPassphrases={detectiveReports.weakPassphrases} />,
    oldPassphrases: <DetectiveOldPassphrases oldPassphrases={detectiveReports.oldPassphrases} />
  }

  return Object.entries({ // Show the least entries first to fit more reports in the screen
    commonPassphrases: detectiveReports.commonPassphrases
      .reduce((total, group) => total + group.length, 0),
    similarWithUsername: detectiveReports.similarWithUsername
      .length,
    weakPassphrases: detectiveReports.weakPassphrases
      .length,
    oldPassphrases: detectiveReports.oldPassphrases
      .length
  }).sort((first, second) => first[1] - second[1]
  ).map(([reportKey]) =>
    reports[reportKey as keyof DetectiveReport]
  )
}

export default Detective
