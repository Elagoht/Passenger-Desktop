import { IconGlobe, IconKey, IconLockSquareRounded } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, createElement } from "react"

interface ITotalCountsProps {
  totalCount: Statistics["totalCount"]
  uniqueCount: Statistics["uniquePassphrases"]
  uniquePlatformsCount: Statistics["uniquePlatformsCount"]
  percentageOfCommon: Statistics["percentageOfCommon"]
}
const TotalCounts: FC<ITotalCountsProps> = ({
  totalCount, uniqueCount, uniquePlatformsCount
}) => {
  const summaryData = [
    {
      icon: IconLockSquareRounded,
      label: "Total Count",
      value: totalCount,
      colSpan: 2,
    },
    {
      icon: IconKey,
      label: "Unique Passphrases",
      value: uniqueCount,
      colSpan: 1
    },
    {
      icon: IconGlobe,
      label: "Unique Platforms",
      value: uniquePlatformsCount,
      colSpan: 1
    }
  ]


  return <article className="grid grid-rows-2 grid-cols-2 gap-2 md:gap-4">
    {summaryData.map((data, index) =>
      <section
        key={index}
        className={classNames({
          "flex py-2 px-3 rounded-lg shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 text-creamcan-500 relative items-center justify-center flex-col text-center overflow-clip": true,
          "col-span-2": data.colSpan === 2
        })}
      >
        {createElement(data.icon, {
          size: 128,
          className: "text-tuatara-500 absolute top-2 right-2 opacity-10"
        })}

        <h2 className="relative text-3xl font-semibold">{data.value}</h2>

        <p className="relative max-sm:text-sm text-tuatara-500 leading-5">
          <strong>{data.label}</strong>
        </p>
      </section>
    )}
  </article>
}

export default TotalCounts
