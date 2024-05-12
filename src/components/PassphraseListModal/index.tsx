import { FC } from "react"
import PassphraseDetails from "./PassphraseDetails"
import PassphraseList from "./PassphraseList"

const PassphraseListModal: FC = () => {
  return <main className="flex z-10 flex-col gap-6 p-6 rounded-t-3xl bg-tuatara-50 dark:bg-tuatara-900 shadow-modal-lg mt-80 dark:shadow-tuatara-1000 shadow-tuatara-200 min-h-screen">
    <PassphraseList />

    <PassphraseDetails />
  </main>
}

export default PassphraseListModal
