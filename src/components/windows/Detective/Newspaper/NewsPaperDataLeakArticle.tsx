import { LeakedData } from "@/types/leakes"
import { FC } from "react"

const NewsPaperDataLeakArticle: FC<LeakedData> = ({
  Title, Name, Domain, LogoPath, PwnCount,
  BreachDate, Description, DataClasses
}) =>
  <article className="p-4 bg-tuatara-100 dark:bg-tuatara-950 rounded-lg prose dark:prose-invert prose-a:text-leaf-500 max-w-none prose-p:m-2 prose-p:text-justify flex flex-col">
    <h3 className="text-creamcan-500">{Title}</h3>

    {Title.replaceAll(" ", "") !== Name.replaceAll(" ", "") &&
      <h4 className="text-leaf-500"
      >{Name}</h4>
    }

    <div className="flex-1">
      <img
        src={LogoPath}
        alt={Name}
        width="88"
        height="88"
        className="float-left m-0 mr-4 aspect-square object-contain"
      />

      <p dangerouslySetInnerHTML={{ __html: Description }} />

      <div className="clear-both" />
    </div>

    <dl className="flex flex-wrap m-0">
      {[{
        key: "Domain",
        value: Domain.startsWith("http")
          ? new URL(Domain).toString()
          : Domain
            ? new URL(`https://${Domain}`).toString()
            : "N/A"
      },
      {
        key: "Leak Count",
        value: PwnCount || "N/A"
      }, {
        key: "Leak Date",
        value: new Date(BreachDate).toLocaleDateString() || "N/A"
      }].map((item) =>
        <div
          key={item.key}
          className="grow bg-tuatara-200 dark:bg-tuatara-900 p-2 m-1 rounded-lg border-2 border-tuatara-300 dark:border-tuatara-800 text-center"
        >
          <dt className="m-0"><b>{item.key}</b></dt>
          <dd className="m-0 p-0">{item.value}</dd>
        </div>
      )}
    </dl>

    <ul className="flex items-center flex-wrap list-none p-0 m-0">
      {DataClasses.map((dataClass, index) =>
        <li
          key={index}
          className="px-2 py-1 m-1 rounded-lg border-2 border-tuatara-300 dark:border-tuatara-700 grow text-center"
        >
          {dataClass}
        </li>
      )}
    </ul>
  </article>

export default NewsPaperDataLeakArticle
