import { DetectiveReport } from "@/types/reports"
import { FC, ReactElement } from "react"
import DetectiveCommonPassphrases from "./detectiveReports/DetectiveCommonPassphrases"
import DetectiveOldPassphrases from "./detectiveReports/DetectiveOldPassphrases"
import DetectiveSimilarWithUsername from "./detectiveReports/DetectiveSimilarWithUsername"
import DetectiveWeakPassphrases from "./detectiveReports/DetectiveWeakPassphrases"

interface IDetectiveProps {
  detectiveReports: DetectiveReport
}

const Detective: FC<IDetectiveProps> = ({ detectiveReports }) => {
  const reports: Record<keyof DetectiveReport, ReactElement> = {
    commonPassphrases: <DetectiveCommonPassphrases
      key="commonPassphrases"
      commonPassphrases={detectiveReports.commonPassphrases}
    />,
    similarWithUsername: <DetectiveSimilarWithUsername
      key="similarWithUsername"
      similarWithUsername={detectiveReports.similarWithUsername}
    />,
    weakPassphrases: <DetectiveWeakPassphrases
      key="weakPassphrases"
      weakPassphrases={detectiveReports.weakPassphrases}
    />,
    oldPassphrases: <DetectiveOldPassphrases
      key="oldPassphrases"
      oldPassphrases={detectiveReports.oldPassphrases}
    />
  }

  return Object.entries({ // Show the least entries first to fit more reports in the screen
    commonPassphrases: detectiveReports.commonPassphrases
      .reduce((total, group) => total + group.length, 0),
    similarWithUsername: detectiveReports.similarWithUsername
      .length,
    weakPassphrases: detectiveReports.weakPassphrases
      .length,
    oldPassphrases: detectiveReports.oldPassphrases
      .length
  }).sort((first, second) => first[1] - second[1]
  ).map(([reportKey]) =>
    reports[reportKey as keyof DetectiveReport]
  )
}

export default Detective
