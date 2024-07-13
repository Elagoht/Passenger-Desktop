import { IconChevronRight } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { ConstantPair } from "../../../types/common"

interface IConstantPairItemProps {
  constant: ConstantPair
}

const ConstantPairItem: FC<IConstantPairItemProps> = ({ constant }) => {

  return <Link
    draggable="false"
    to={`/settings/constant-pairs/${constant.key}`}
    className="flex items-center gap-2 p-3 bg-tuatara-50 dark:bg-tuatara-900 rounded-md w-full text-left hover:bg-white dark:hover:bg-tuatara-800 transition-all duration-300 ease-in-out"
  >
    <div className="grid leading-none gap-2 grow">
      <div className="line-clamp-1 text-creamcan-500">
        {constant.key}
      </div>

      <div className="text-tuatara-500 line-clamp-1">
        {constant.value}
      </div>
    </div>

    <IconChevronRight size={24} />
  </Link>
}

export default ConstantPairItem
