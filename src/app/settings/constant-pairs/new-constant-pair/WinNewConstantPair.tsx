import ConstantPairForm from "@/components/forms/ConstantPairForm"
import GoBackHeader from "@/components/layout/GoBackHeader"
import Window from "@/components/layout/Window"
import { FC } from "react"

const WinNewConstantPair: FC = () => {
  return <Window>
    <GoBackHeader
      href="/settings/constant-pairs"
      title="New Constant Pair"
    />

    <ConstantPairForm mode="declare" />
  </Window>
}

export default WinNewConstantPair
