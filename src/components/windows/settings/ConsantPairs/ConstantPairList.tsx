import { FC } from "react"
import ConstantPairItem from "./ConstantPairItem"
import { ConstantPair } from "@/types/common"

interface IConstantPairListProps {
  constants: ConstantPair[]
}

const ConstantPairList: FC<IConstantPairListProps> = ({ constants }) =>
  <div className="grid gap-2">
    {constants.map((constant, index) =>
      <ConstantPairItem
        key={index}
        constant={constant}
      />
    )}
  </div>

export default ConstantPairList
