import { IconEdit } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"

interface IEntryEditLinkProps {
  id: string
}

const EntryEditLink: FC<IEntryEditLinkProps> = ({
  id
}) => {
  return <Link
    to={`/passphrases/${id}`}
    draggable="false"
    className="transition-all hover:bg-sky-500 flex flex-col items-center px-2
    justify-center leading-snug h-14 flex-1 hover:flex-[1.5] hover:text-white"
  >
    <IconEdit /> Edit
  </Link>
}

export default EntryEditLink
