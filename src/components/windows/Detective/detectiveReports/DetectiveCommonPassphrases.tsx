import { ListableDatabaseEntry } from "@/types/common"
import { FC } from "react"
import DetectiveReportSheet from "../DetectiveReportSheet"
import DetectiveSheetGrid from "../DetectiveSheetGrid"

interface IDetectiveCommonPassphrasesProps {
  commonPassphrases: ListableDatabaseEntry[][]
}

const DetectiveCommonPassphrases: FC<IDetectiveCommonPassphrasesProps> = ({
  commonPassphrases
}) =>
  <DetectiveReportSheet
    title="Shared Passphrases"
    isEmpty={!commonPassphrases.length}
    subtitle="These group of entries share the same passphrase between each other:"
  >
    {commonPassphrases.map((passphraseList) =>
      <DetectiveSheetGrid passphrases={passphraseList} />
    )}
  </DetectiveReportSheet>

export default DetectiveCommonPassphrases
