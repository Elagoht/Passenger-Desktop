import { IconDatabaseExclamation } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import StringHelper from "../../../helpers/string"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ConstantPair } from "../../../types/common"
import ConstantPairField from "./ConstantPairField"

const ConstantPairsForm: FC = () => {
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constants, setConstants] = useState<ConstantPair[]>()

  const [currentlyEditing, setCurrentlyEditing] = useState<Record<string, boolean>>(
    Object.fromEntries(constants?.map(constant => [constant.key, false]) ?? [])
  )


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

  if (!constants) return <></>

  return <div className="grid gap-2">
    {constants.map((constant, index) =>
      <ConstantPairField
        key={index}
        constant={constant}
        isEditing={currentlyEditing[constant.key]}
        toggleEditing={() => setCurrentlyEditing(prev => ({
          // Collapse all other fields
          ...Object.fromEntries(constants.map(
            constant => [constant.key, false]
          )), // Toggle the current field
          [constant.key]: !prev[constant.key]
        }))}
      />
    )}
  </div>
}

export default ConstantPairsForm
