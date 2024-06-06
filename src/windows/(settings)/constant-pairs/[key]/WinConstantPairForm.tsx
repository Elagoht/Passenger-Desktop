import { FC } from "react"
import ConstantPairForm from "../../../../components/(settings)/ConsantPairs/ConstantPairForm"
import Window from "../../../../components/layout/Window"

const WinConstantPairForm: FC = () => {
  return <Window compact>
    <h1>Constant Pair Form</h1>

    <ConstantPairForm />
  </Window>
}

export default WinConstantPairForm