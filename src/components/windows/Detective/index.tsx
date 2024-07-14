import Loading from "@/components/layout/Loading"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { getDetectiveReports } from "@/services/reportServices"
import { DetectiveReport } from "@/types/reports"
import { Maybe } from "@/types/utility"
import { useEffect, useState } from "react"
import DetectiveCommonPassphrases from "./detectiveReports/DetectiveCommonPassphrases"
import DetectiveSimilarWithUsername from "./detectiveReports/DetectiveSimilarWithUsername"
import DetectiveWeakPassphrases from "./detectiveReports/DetectiveWeakPassphrases"
import DetectiveOldPassphrases from "./detectiveReports/DetectiveOldPassphrases"

const Detective = () => {
  const accessToken = authStore(store => store.accessToken)
  const addNotification = toastStore(store => store.addToast)

  const [detectiveReports, setDetectiveReports] = useState<Maybe<DetectiveReport>>(null)

  useEffect(() => {
    getDetectiveReports(
      accessToken
    ).then((response) => {
      if (response.status !== 0) return addNotification({
        title: "Error",
        message: StringHelper.removeUnixErrorPrefix(response.stderr),
        type: "error"
      })
      setDetectiveReports(StringHelper.deserialize<DetectiveReport>(response.stdout))
    })
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
