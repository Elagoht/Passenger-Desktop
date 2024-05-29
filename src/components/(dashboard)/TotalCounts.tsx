import { IconAsterisk, IconComponents, IconPercentage, IconSparkles } from "@tabler/icons-react"
import { FC, createElement } from "react"
import { Statistics } from "../../types/statistics"

interface ITotalCountsProps {
  totalCount: Statistics["totalCount"]
  uniqueCount: Statistics["uniquePassphrases"]
  uniquePlatformsCount: Statistics["uniquePlatformsCount"]
  percentageOfCommon: Statistics["percentageOfCommon"]
}
const TotalCounts: FC<ITotalCountsProps> = ({
  totalCount, uniqueCount, uniquePlatformsCount, percentageOfCommon
}) => {
  const summaryData = [
    {
      icon: IconSparkles,
      label: "Total Count",
      value: totalCount
    },
    {
      icon: IconAsterisk,
      label: "Unique Passphrases",
      value: uniqueCount
    },
    {
      icon: IconComponents,
      label: "Unique Platforms",
      value: uniquePlatformsCount
    },
    {
      icon: IconPercentage,
      label: "% of Common",
      value: percentageOfCommon
    }
  ]


  return <article className="grid grid-rows-2 grid-cols-2 gap-2 md:gap-4">
    {summaryData.map((data, index) =>
      <section
        key={index}
        className="flex py-2 px-3 rounded-lg shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 text-creamcan-500 relative items-center justify-center flex-col text-center"
      >
        <h2 className="text-3xl font-semibold">{data.value}</h2>

        <p className="max-sm:text-sm text-gray-500 dark:text-gray-400 leading-5">
          <strong>{data.label}</strong>
        </p>

        {createElement(data.icon, { size: 32, className: "text-leaf-500 absolute top-2 right-2" })}
      </section>
    )}
  </article>
}

export default TotalCounts
