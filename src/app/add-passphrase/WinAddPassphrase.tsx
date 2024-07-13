import PassphraseEntryForm from "@/components/forms/ImportFromBrowserForm/PassphraseEntryForm"
import Window from "@/components/layout/Window"
import { FC } from "react"

const WinAddPassphrase: FC = () =>
  <Window compact>
    <h1 className="text-3xl font-medium text-center my-4">
      New Passphrase
    </h1>

    <PassphraseEntryForm mode="new" />
  </Window>

export default WinAddPassphrase
