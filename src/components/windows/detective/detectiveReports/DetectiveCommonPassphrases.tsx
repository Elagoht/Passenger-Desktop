import { FC } from "react"
import DetectiveReportSheet from "../DetectiveReportSheet"
import DetectiveSheetGrid from "../DetectiveSheetGrid"

interface IDetectiveCommonPassphrasesProps {
  commonPassphrases: ListableDatabaseEntry[][]
}

const DetectiveCommonPassphrases: FC<IDetectiveCommonPassphrasesProps> = ({
  commonPassphrases
}) => {
  return <DetectiveReportSheet
    title="Shared Passphrases"
    isEmpty={!commonPassphrases.length}
    subtitle={"These group of entries share the same"
      + " passphrase between each other:"
    }
  >
    {commonPassphrases.map((passphraseList) =>
      <DetectiveSheetGrid
        key={passphraseList[0].id}
        passphrases={passphraseList}
      />
    )}
  </DetectiveReportSheet>
}

export default DetectiveCommonPassphrases
