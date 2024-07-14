import PassphraseEntryForm from "@/components/forms/PassphraseEntryForm"
import Window from "@/components/layout/Window"
import { FC } from "react"

const WinAddPassphrase: FC = () =>
  <Window title="New Passphrase" >
    <PassphraseEntryForm mode="new" />
  </Window>

export default WinAddPassphrase
