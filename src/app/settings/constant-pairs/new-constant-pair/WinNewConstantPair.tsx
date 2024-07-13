import { FC } from "react"
import GoBackHeader from "../../../../components/layout/GoBackHeader"
import Window from "../../../../components/layout/Window"
import ConstantPairDeclareForm from "../../../../components/forms/ConstantPairDeclareForm"

const WinNewConstantPair: FC = () => {
  return <Window compact>
    <GoBackHeader
      href="/settings/constant-pairs"
      title="New Constant Pair"
    />

    <ConstantPairDeclareForm />
  </Window>
}

export default WinNewConstantPair
