import { FC } from "react"
import DetectiveReportSheet from "../DetectiveReportSheet"
import DetectiveSheetGrid from "../DetectiveSheetGrid"

interface IDetectiveSimilarWithUsernameProps {
  similarWithUsername: ListableDatabaseEntry[]
}

const DetectiveSimilarWithUsername: FC<IDetectiveSimilarWithUsernameProps> = ({
  similarWithUsername
}) => {
  return <DetectiveReportSheet
    title="Similar With Username"
    isEmpty={!similarWithUsername.length}
    subtitle="These passphrases are similar with usernames:"
  >
    <DetectiveSheetGrid passphrases={similarWithUsername} />
  </DetectiveReportSheet>
}

export default DetectiveSimilarWithUsername
