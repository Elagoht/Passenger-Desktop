import { FC } from "react"
import ConstantPairForm from "../../../../components/settings/ConsantPairs/ConstantPairForm"
import GoBackHeader from "../../../../components/layout/GoBackHeader"
import Window from "../../../../components/layout/Window"

const WinConstantPairForm: FC = () => {
  return <Window compact>
    <GoBackHeader
      href="/settings/constant-pairs"
      title="Constant Pair Details"
    />

    <ConstantPairForm />
  </Window>
}

export default WinConstantPairForm