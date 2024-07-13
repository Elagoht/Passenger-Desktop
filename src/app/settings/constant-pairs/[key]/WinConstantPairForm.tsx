import { FC } from "react"
import GoBackHeader from "../../../../components/layout/GoBackHeader"
import Window from "../../../../components/layout/Window"
import ConstantPairForm from "../../../../components/forms/ConstantPairForm"

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