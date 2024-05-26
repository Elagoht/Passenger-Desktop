import { IconAsterisk, IconComponents, IconSparkles } from "@tabler/icons-react"
import { FC } from "react"
import { Statistics } from "../../types/statistics"

interface ITotalCountsProps {
  totalCount: Statistics["totalCount"]
  uniqueCount: Statistics["uniquePassphrases"]
  uniquePlatformsCount: Statistics["uniquePlatformsCount"]
}

const TotalCounts: FC<ITotalCountsProps> = ({
  totalCount, uniqueCount, uniquePlatformsCount
}) => {

  return <article className="grid grid-rows-2 grid-cols-2 gap-2 md:gap-4">
    <section className="flex py-2 px-3 rounded-lg shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 text-creamcan-500 col-span-2">
      <div className="flex flex-col grow">
        <h2 className="text-lg font-semibold">Total</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>{totalCount}</strong> passphrases in your vault
        </p>
      </div>

      <IconSparkles size={32} className="text-leaf-500" />
    </section>

    <section className="flex py-2 px-3 rounded-lg shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 text-creamcan-500">
      <div className="flex flex-col grow">
        <h2 className="text-lg font-semibold">Passphrases</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>{uniqueCount}</strong> unique
        </p>
      </div>

      <IconAsterisk size={32} className="text-leaf-500" />
    </section>

    <section className="flex py-2 px-3 rounded-lg shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 text-creamcan-500">
      <div className="flex flex-col grow">
        <h2 className="text-lg font-semibold">Platforms</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>{uniquePlatformsCount}</strong> unique
        </p>
      </div>

      <IconComponents size={32} className="text-leaf-500" />
    </section>
  </article>
}

export default TotalCounts
