import { ListableDatabaseEntry } from "@/types/common"
import { FC } from "react"
import DetectiveReportSheet from "../DetectiveReportSheet"
import DetectiveSheetGrid from "../DetectiveSheetGrid"

interface IDetectiveOldPassphrasesProps {
  oldPassphrases: ListableDatabaseEntry[]
}

const DetectiveOldPassphrases: FC<IDetectiveOldPassphrasesProps> = ({
  oldPassphrases
}) =>
  <DetectiveReportSheet
    title="Old Passphrases"
    isEmpty={!oldPassphrases.length}
    subtitle="These entries have old passphrases:"
  >
    <DetectiveSheetGrid passphrases={oldPassphrases} />
  </DetectiveReportSheet>

export default DetectiveOldPassphrases
