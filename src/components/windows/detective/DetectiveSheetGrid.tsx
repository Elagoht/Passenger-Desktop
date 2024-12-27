import { FC } from "react"
import DetectiveSheetItem from "./DetectiveSheetItem"

interface IDetectiveSheetGridProps {
  title?: string
  passphrases: ListableDatabaseEntry[]
}

const DetectiveSheetGrid: FC<IDetectiveSheetGridProps> = ({
  title, passphrases
}) => {
  return <div className="p-2 flex flex-col gap-1 bg-tuatara-100
  dark:bg-tuatara-950 rounded-lg"
  >
    {title &&
      <em>{title}</em>
    }

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {passphrases.map((passphrase) =>
        <DetectiveSheetItem
          key={passphrase.id}
          {...passphrase}
        />
      )}
    </div>
  </div>
}

export default DetectiveSheetGrid
