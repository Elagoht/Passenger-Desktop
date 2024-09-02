import { FC } from "react"

interface IAverateLengthProps {
  averageLength: Statistics["averageLength"]
}

const AverageLength: FC<IAverateLengthProps> = ({ averageLength }) => {
  return <article className="rounded-xl p-4 shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 relative overflow-clip">
    <img
      src="/hacker.webp"
      alt="Hacker evaluating your passphrase length"
      className="absolute bottom-0 right-0 opacity-25 dark:opacity-100"
    />

    <div className="relative h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-creamcan-500 mb-3">
          Average Length
        </h2>

        <p className="text-3xl font-semibold">
          {averageLength}
        </p>
      </div>

      <p>This is how hackers see your passphrases:</p>

      <div className="flex items-center justify-center flex-wrap my-4 grow">
        {Array.from({ length: averageLength }, (_, index) => (
          <span
            key={index}
            className="text-3xl leading-5"
            style={{
              color: index <= 8
                ? "hsl(120, 100%, 50%)"
                : index <= 12
                  ? `hsl(${120 - (index - 8) * 15}, 100%, 50%)`
                  : index <= 24
                    ? `hsl(${60 - (index - 12) * 5}, 100%, 50%)`
                    : `hsl(0, 100%, ${50 - (index - 24) * 2}%)`
            }}
          >
            •
          </span>
        ))}
      </div>

      <small className="text-tuatara-500">
        {averageLength <= 8
          ? "Ah well, an easy target."
          : averageLength <= 12
            ? "Okay, I can handle this."
            : averageLength <= 16
              ? "This is gonna take a while."
              : averageLength <= 20
                ? "Oh, you're one of those."
                : "I give up. You win."
        }
      </small>
    </div>
  </article>
}

export default AverageLength
