import { FC, useEffect } from "react"
import PassphraseCard from "."
import { usePassphrasesSlice } from "../../stores/passphrases"


const PassphraseCardList: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)
  const selectedPassphrase = usePassphrasesSlice((state) => state.selectedPassphrase)
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)
  const selectNextPassphrase = usePassphrasesSlice((state) => state.selectNextPassphrase)
  const selectPreviousPassphrase = usePassphrasesSlice((state) => state.selectPreviousPassphrase)
  const openDetails = usePassphrasesSlice((state) => state.openDetails)
  const closeDetails = usePassphrasesSlice((state) => state.closeDetails)

  useEffect(() => {
    const arrowUpOrLeftToSelectPrevious = (event: KeyboardEvent) => (
      event.key === "ArrowLeft"
      || event.key === "ArrowUp"
    ) && selectPreviousPassphrase()

    const arrowDownOrRightToSelectNext = (event: KeyboardEvent) => (
      event.key === "ArrowRight"
      || event.key === "ArrowDown"
    ) && selectNextPassphrase()

    const escapeToCloseDetails = (event: KeyboardEvent) => (
      event.key === "Escape"
    ) && closeDetails()

    const spaceOrEnterToOpenDetails = (event: KeyboardEvent) => (
      event.key === " " || event.key === "Enter"
    ) && !detailsVisible
      && openDetails()

    window.addEventListener("keydown", escapeToCloseDetails)
    window.addEventListener("keydown", arrowUpOrLeftToSelectPrevious)
    window.addEventListener("keydown", arrowDownOrRightToSelectNext)
    window.addEventListener("keydown", spaceOrEnterToOpenDetails)

    return () => {
      window.removeEventListener("keydown", escapeToCloseDetails)
      window.removeEventListener("keydown", arrowUpOrLeftToSelectPrevious)
      window.removeEventListener("keydown", arrowDownOrRightToSelectNext)
      window.removeEventListener("keydown", spaceOrEnterToOpenDetails)
    }
  }, [])

  return <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {passphrases.map((passphrase, index) =>
      <PassphraseCard
        selected={index === selectedPassphrase}
        key={passphrase.id}
        index={index}
        {...passphrase}
      />
    )}
  </ul>
}

export default PassphraseCardList
