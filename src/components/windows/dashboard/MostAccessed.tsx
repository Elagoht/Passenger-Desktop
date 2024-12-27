import { FC } from "react"
import classNames from "classnames"
import { Link } from "react-router-dom"

interface IMostAccessedProps {
  mostAccessed: Statistics["mostAccessed"]
}

const MostAccessed: FC<IMostAccessedProps> = ({ mostAccessed }) => {
  return <article className="rounded-xl p-4 shadow shadow-tuatara-300
    dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900"
  >
    <h2 className="text-lg font-semibold text-creamcan-500 mb-3">
      Most Accessed
    </h2>

    {mostAccessed.length === 0 &&
      <p className="text-center text-tuatara-500">
        No passphrases have been accessed yet.
      </p>
    }

    {mostAccessed.length > 0 &&
      <ul>
        {mostAccessed.map((passphrase, index) =>
          <Link
            key={passphrase.id}
            to={`/passphrases/${passphrase.id}?cameFrom=/dashboard`}
          >
            <li className="flex items-center gap-4 p-1 pr-3
              hover:bg-tuatara-100 dark:hover:bg-tuatara-800 rounded-full
              transition duration"
            >
              <img
                src={`https://icon.horse/icon/${new URL(
                  passphrase.url.startsWith("http")
                    ? passphrase.url
                    : `http://${passphrase.url}`
                ).hostname}`}
                draggable="false"
                onError={(event) => {
                  (event.target as HTMLImageElement).src = "/icon.png"
                }}
                alt={passphrase.platform}
                width={32}
                height={32}
                className="rounded-full"
              />

              <h3 className="font-medium grow">{passphrase.platform}</h3>

              <span className={classNames(
                "drop-shadow-md", {
                "text-creamcan-400 text-xl": index === 0,
                "text-creamcan-500 text-lg": index === 1,
                "text-creamcan-600": index === 2,
                "text-creamcan-700 text-sm": index === 3,
                "text-creamcan-800 text-sm": index === 4
              })}>{passphrase.totalAccesses}</span>
            </li>
          </Link>
        )}
      </ul>
    }
  </article>
}

export default MostAccessed
