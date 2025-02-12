import { FC } from "react"
import { Link } from "react-router-dom"

const DetectiveSheetItem: FC<ListableDatabaseEntry> = (props) => {
  return <Link
    draggable={false}
    to={`/passphrases/${props.id}?cameFrom=/detective`}
    className="flex justify-start items-center shadow rounded-lg bg-white
  dark:bg-tuatara-800 dark:text-white text-tuatara-900 p-2 gap-2"
  >
    <img
      src={`https://icon.horse/icon/${new URL(
        props.url.startsWith("http")
          ? props.url
          : `http://${props.url}`
      ).hostname}`}
      onError={(event) => {
        (event.target as HTMLImageElement).src = "/icon.png"
      }}
      alt={props.platform}
      draggable="false"
      className="w-10 h-10 rounded-full"
    />

    <div className="text-creamcan-500 font-medium line-clamp-1">
      {props.platform}
    </div>
  </Link>
}

export default DetectiveSheetItem
