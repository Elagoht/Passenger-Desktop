import { FC } from "react"
import ConstantPairForm from "../../../../components/(settings)/ConsantPairs/ConstantPairForm"
import Window from "../../../../components/layout/Window"
import { Link } from "react-router-dom"
import { IconArrowLeft } from "@tabler/icons-react"

const WinConstantPairForm: FC = () => {
  return <Window compact>
    <div className="flex gap-2 items-center mb-4">
      <Link
        draggable="false"
        to="/settings/constant-pairs"
        className="hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl transition-all duration-300"
      >
        <IconArrowLeft size={32} />
      </Link>

      <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
        Constant Pair Details
      </h1>
    </div>


    <ConstantPairForm />
  </Window>
}

export default WinConstantPairForm