import ResetMasterPassphraseForm from "@/components/forms/ResetMasterPassphraseForm"
import GoBackHeader from "@/components/layout/GoBackHeader"
import Window from "@/components/layout/Window"
import { FC } from "react"

const WinResetMasterPassphrase: FC = () =>
  <Window>
    <GoBackHeader
      href="/settings"
      title="Reset Master Passphrase"
    />

    <ResetMasterPassphraseForm />
  </Window>

export default WinResetMasterPassphrase
