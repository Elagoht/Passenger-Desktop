import { FC } from "react"
import Logo from "../components/Logo"
import SearchBar from "../components/SearchBar"
import PassphraseCardList from "../components/PassphraseCard/PassphraseCardList"

const PasswordWin: FC = () => {
  return <main className="flex flex-col gap-4 p-4">

    <Logo />

    <SearchBar />

    <PassphraseCardList />
  </main>
}

export default PasswordWin
