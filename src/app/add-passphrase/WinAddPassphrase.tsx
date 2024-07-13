import { FC } from "react"
import Window from "../../components/layout/Window"
import AddPassphraseForm from "../../components/forms/AddPassphraseForm"

const WinAddPassphrase: FC = () =>
  <Window compact>
    <h1 className="text-3xl font-medium text-center my-4">
      New Passphrase
    </h1>

    <AddPassphraseForm />
  </Window>

export default WinAddPassphrase
