import { FC } from "react"
import Window from "../../layout/Window"
import PassphraseList from "../../(passphrases)/PassphraseList"

const WinPassphrases: FC = () => {
  return <Window className="flex flex-col gap-6 p-4">
    <img
      src="/safe.webp"
      alt="Passphrases"
      width={256}
      height={256}
      draggable="false"
      className="mt-12 mx-auto max-h-[33%] aspect-square max-w-full object-contain"
    />

    <PassphraseList />
  </Window>
}

export default WinPassphrases
