import { IconDatabaseExclamation } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import StringHelper from "../../../helpers/string"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ConstantPair } from "../../../types/common"
import ConstantPairItem from "./ConstantPairItem"
import Loading from "../../layout/Loading"

const ConstantPairList: FC = () => {
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constants, setConstants] = useState<ConstantPair[]>()

  useEffect(() => {
    Service.constants(
      accessToken
    ).then((response) => {
      if (!response.success) return addNotification({
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.output),
        icon: <IconDatabaseExclamation />
      })
      setConstants(StringHelper.deserialize<ConstantPair[]>(response.output) ?? undefined)
    })
  }, [])

  if (!constants) return <Loading />

  return <div className="grid gap-2">
    {constants.map((constant, index) =>
      <ConstantPairItem
        key={index}
        constant={constant}
      />
    )}
  </div>
}

export default ConstantPairList
