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
  >
    {commonPassphrases.map((passphraseList) =>
      <DetectiveSheetGrid
        title="These are sharing same passphrase:"
        passphrases={passphraseList}
      />
    )}
  </DetectiveReportSheet>

export default DetectiveCommonPassphrases
