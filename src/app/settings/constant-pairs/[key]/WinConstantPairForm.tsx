import { FC, useEffect, useState } from "react"
import GoBackHeader from "@/components/layout/GoBackHeader"
import Window from "@/components/layout/Window"
import ConstantPairForm from "@/components/forms/ConstantPairForm"
import { ConstantPair } from "@/types/common"
import { rememberConstantPair } from "@/services/constantPairServices"
import StringHelper from "@/helpers/string"
import { IconDatabaseExclamation } from "@tabler/icons-react"
import Loading from "@/components/layout/Loading"
import { useNavigate, useParams } from "react-router-dom"
import { useNotificationSlice } from "@/lib/stores/notification"
import { useAuthorizationSlice } from "@/lib/stores/authorization"

const WinConstantPairForm: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{ key: string }>()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constant, setConstant] = useState<ConstantPair>()

  useEffect(() => {
    rememberConstantPair(
      accessToken,
      params.key!
    ).then((response) => {
      if (response.status === 0) return
      setConstant(StringHelper.deserialize<ConstantPair>(response.stdout))
      addNotification({
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.stderr),
        icon: <IconDatabaseExclamation />
      })
      navigate("/settings/constant-pairs")
    })
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