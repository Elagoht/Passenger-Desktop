import { FC } from "react"
import Logo from "../components/Logo"
import SearchBar from "../components/SearchBar"
import PassphraseCardList from "../components/PassphraseCardList"
import PassphraseDetails from "../components/PassphraseDetails"

const PasswordWin: FC = () => {
  return <main className="flex flex-col gap-4 p-4">

    <Logo />

    <SearchBar />

    <PassphraseCardList />

    <PassphraseDetails />
  </main>
}

export default PasswordWin
