import Loading from "@/components/layout/Loading"
import Window from "@/components/layout/Window"
import Detective from "@/components/windows/Detective"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { getDetectiveReports } from "@/services/reportServices"
import { DetectiveReport } from "@/types/reports"
import { IconZoomCancel } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Maybe } from "yup"

const WinDetective = () => {
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

  return <Window
    title="Detective"
    description="Detective is your personal assistant to help you find potential security issues in your vault."
  >

    <Detective detectiveReports={detectiveReports} />
  </Window>
}

export default WinDetective
