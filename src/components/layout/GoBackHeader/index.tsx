import { IconArrowLeft } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"

interface IGoBackHeaderProps {
  href: string
  title: string
}

const GoBackHeader: FC<IGoBackHeaderProps> = ({ href, title }) => {
  return <div className="flex gap-2 items-center mb-2">
    <Link
      draggable="false"
      to={href}
      className="hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl transition-all duration-300"
    >
      <IconArrowLeft size={32} />
    </Link>

    <h1 className="text-xl font-medium text-tuatara-900 dark:text-tuatara-50">
      {title}
    </h1>
  </div>
}

export default GoBackHeader
