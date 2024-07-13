import { FC } from "react"
import Window from "../../components/layout/Window"
import PassphraseList from "../../components/passphrases/PassphraseList"

const WinPassphrases: FC = () => {
  return <Window>
    <div className="flex flex-col gap-6">
      <img
        src="/safe.webp"
        alt="Passphrases"
        width={256}
        height={256}
        draggable="false"
        className="mt-6 mx-auto max-h-[33%] aspect-square max-w-full object-contain"
      />

      <PassphraseList />
    </div>
  </Window>
}

export default WinPassphrases
