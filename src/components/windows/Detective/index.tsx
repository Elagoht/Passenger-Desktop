import Loading from "@/components/layout/Loading"
import handleResponse from "@/helpers/services"
import { authStore } from "@/lib/stores/authorization"
import { getDetectiveReports } from "@/services/reportServices"
import { DetectiveReport } from "@/types/reports"
import { Maybe } from "@/types/utility"
import { useEffect, useState } from "react"
import DetectiveCommonPassphrases from "./detectiveReports/DetectiveCommonPassphrases"
import DetectiveOldPassphrases from "./detectiveReports/DetectiveOldPassphrases"
import DetectiveSimilarWithUsername from "./detectiveReports/DetectiveSimilarWithUsername"
import DetectiveWeakPassphrases from "./detectiveReports/DetectiveWeakPassphrases"
import StringHelper from "@/helpers/string"
import { IconZoomCancel } from "@tabler/icons-react"

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

  return <div className="grid gap-4 xl:grid-cols-2">
    <DetectiveCommonPassphrases commonPassphrases={detectiveReports.commonPassphrases} />

    <DetectiveSimilarWithUsername similarWithUsername={detectiveReports.similarWithUsername} />

    <DetectiveWeakPassphrases weakPassphrases={detectiveReports.weakPassphrases} />

    <DetectiveOldPassphrases oldPassphrases={detectiveReports.oldPassphrases} />
  </div>
}

export default Detective
