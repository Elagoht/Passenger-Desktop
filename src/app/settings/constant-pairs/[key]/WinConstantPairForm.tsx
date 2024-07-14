import ConstantPairForm from "@/components/forms/ConstantPairForm"
import GoBackHeader from "@/components/layout/GoBackHeader"
import Loading from "@/components/layout/Loading"
import Window from "@/components/layout/Window"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { rememberConstantPair } from "@/services/constantPairServices"
import { ConstantPair } from "@/types/common"
import { IconDatabaseExclamation } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const WinConstantPairForm: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{ key: string }>()

  const accessToken = authStore((state) => state.accessToken)

  const [constant, setConstant] = useState<ConstantPair>()

  useEffect(() => {
    rememberConstantPair(
      accessToken,
      params.key!
    ).then((response) => handleResponse(
      response,
      [() => setConstant(StringHelper.deserialize<ConstantPair>(response.stdout))],
      [() => navigate("/settings/constant-pairs"), {
        errorTitle: "Failed to fetch constant pair",
        errorIcon: IconDatabaseExclamation
      }]
    ))
  }, [])

  if (!constant) return <Loading />

  return <Window>
    <GoBackHeader
      href="/settings/constant-pairs"
      title="Constant Pair Details"
    />

    <ConstantPairForm
      mode="modify"
      existing={constant}
    />
  </Window>
}

export default WinConstantPairForm