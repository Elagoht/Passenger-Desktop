import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { FC, createElement, useEffect, useState } from "react"
import { Statistics } from "../../types/statistics"

interface IMostUsedPassphraseProps {
  mostCommon: Statistics["mostCommon"]
}

const MostUsedPassphrase: FC<IMostUsedPassphraseProps> = ({ mostCommon }) => {
  const [reveal, setReveal] = useState<boolean>(false)

  useEffect(() => {
    /**
     * Hide the passphrase whether the user
     * releases the mouse outside the button
     */
    const handleMouseDown = () => setReveal(false)
    addEventListener("mouseup", handleMouseDown)
    return () => removeEventListener("mouseup", handleMouseDown)
  }, [])

  return <article className="flex flex-col items-center justify-center rounded-xl p-4 shadow shadow-tuatara-300 dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900">
    <h2 className="text-lg font-semibold text-creamcan-500 mb-3">
      Most Used Passphrase
    </h2>

    <button
      onMouseDown={() => setReveal(true)}
      className="flex items-center w-full gap-2 bg-tuatara-100 dark:bg-tuatara-800 rounded-md p-2">
      <span className="text-lg font-medium line-clamp-1 grow text-center">
        {reveal
          ? mostCommon
          : "Reveal the secret"
        }
      </span>

      {createElement(
        reveal
          ? IconEyeOff
          : IconEye,
        { className: "text-leaf-500 shrink-0", size: 32 }
      )}
    </button>
  </article>
}

export default MostUsedPassphrase
