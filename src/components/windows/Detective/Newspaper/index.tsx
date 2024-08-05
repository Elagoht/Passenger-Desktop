import { LeakedData } from "@/types/leakes"
import { FC } from "react"
import NewsPaperDataLeakArticle from "./NewsPaperDataLeakArticle"
import DetectiveReportSheet from "../DetectiveReportSheet"

interface INewspaperProps {
  content: LeakedData[]
}

const Newspaper: FC<INewspaperProps> = ({ content }) =>
  <DetectiveReportSheet
    title="Latest Data Leaks"
    isEmpty={!content.length}
    subtitle="Here are some of the latest data leaks."
  >
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
      {content.map((leakedData, index) =>
        <NewsPaperDataLeakArticle
          key={index}
          {...leakedData}
        />
      )}
    </div>
  </DetectiveReportSheet>

export default Newspaper
