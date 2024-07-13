import { ListableDatabaseEntry } from "@/types/common"
import { FC } from "react"
import DetectiveReportSheet from "../DetectiveReportSheet"
import DetectiveSheetGrid from "../DetectiveSheetGrid"

interface IDetectiveWeakPassphrasesProps {
  weakPassphrases: ListableDatabaseEntry[]
}

const DetectiveWeakPassphrases: FC<IDetectiveWeakPassphrasesProps> = ({
  weakPassphrases
}) =>
  <DetectiveReportSheet
    title="Weak Passphrases"
    isEmpty={!weakPassphrases.length}
    subtitle="These entries have weak passphrases:"
  >
    <DetectiveSheetGrid passphrases={weakPassphrases} />
  </DetectiveReportSheet>


export default DetectiveWeakPassphrases
