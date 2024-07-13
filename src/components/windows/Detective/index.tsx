import Loading from "@/components/layout/Loading"
import StringHelper from "@/helpers/string"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import { useNotificationSlice } from "@/lib/stores/notification"
import { getDetectiveReports } from "@/services/reportServices"
import { DetectiveReport } from "@/types/reports"
import { Maybe } from "@/types/utility"
import { useEffect, useState } from "react"

const Detective = () => {
  const accessToken = useAuthorizationSlice(store => store.accessToken)
  const addNotification = useNotificationSlice(store => store.addNotification)

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

  return <pre>
    {JSON.stringify(detectiveReports, null, 2)}
  </pre>
}

export default Detective
