import Loading from "@/components/layout/Loading"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { fetchAllConstantPairs } from "@/services/constantPairServices"
import { ConstantPair } from "@/types/common"
import { IconDatabaseExclamation } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import ConstantPairItem from "./ConstantPairItem"
import handleResponse from "@/helpers/services"

const ConstantPairList: FC = () => {
  const accessToken = authStore((state) => state.accessToken)

  const [constants, setConstants] = useState<ConstantPair[]>()

  useEffect(() => {
    fetchAllConstantPairs(
      accessToken
    ).then((response) => handleResponse(
      response,
      [() => setConstants(StringHelper.deserialize<ConstantPair[]>(response.stdout) ?? undefined)],
      [() => void 0, {
        errorTitle: "Failed to fetch constant pairs",
        errorIcon: IconDatabaseExclamation
      }]
    ))
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
