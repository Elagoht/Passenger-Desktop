import ResetMasterPassphraseForm from "@/components/forms/ResetMasterPassphraseForm"
import Window from "@/components/layout/Window"
import { FC } from "react"

const WinResetMasterPassphrase: FC = () =>
  <Window
    title="Reset Master Passphrase"
    description="Reset your master passphrase to a new one."
  >

    <ResetMasterPassphraseForm />
  </Window>

export default WinResetMasterPassphrase
