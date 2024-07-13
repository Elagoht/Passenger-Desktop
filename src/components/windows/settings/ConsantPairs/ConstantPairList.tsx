import { IconDatabaseExclamation } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import StringHelper from "@/helpers/string"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import { useNotificationSlice } from "@/lib/stores/notification"
import { ConstantPair } from "@/types/common"
import ConstantPairItem from "./ConstantPairItem"
import Loading from "@/components/layout/Loading"
import { fetchAllConstantPairs } from "@/services/constantPairServices"

const ConstantPairList: FC = () => {
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constants, setConstants] = useState<ConstantPair[]>()

  useEffect(() => {
    fetchAllConstantPairs(
      accessToken
    ).then((response) => {
      if (response.status !== 0) return addNotification({
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.stderr),
        icon: <IconDatabaseExclamation />
      })
      setConstants(StringHelper.deserialize<ConstantPair[]>(response.stdout) ?? undefined)
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