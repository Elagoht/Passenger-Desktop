import { IconSearch } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { usePassphrasesSlice } from "../../stores/passphrases"
import { ListablePassphrase } from "../../types/common"
import FancyInput from "../form/FancyInput"
import PassphraseCard from "../PassphraseCard"

const PassphraseList: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)
  const closeDetails = usePassphrasesSlice((state) => state.closeDetails)

  useEffect(() => {
    const escapeToCloseDetails = (event: KeyboardEvent) => (
      event.key === "Escape"
    ) && closeDetails()
    window.addEventListener("keydown", escapeToCloseDetails)
    return () => window.removeEventListener("keydown", escapeToCloseDetails)
  }, [detailsVisible])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const [filteredPassphrases, setFilteredPassphrases] = useState<ListablePassphrase[]>([])

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchTermLower = debouncedSearchTerm.toLowerCase()
      const filtered = passphrases.filter((passphrase) =>
        passphrase.platform.toLowerCase().includes(searchTermLower)
      )
      setFilteredPassphrases(filtered)
    } else {
      setFilteredPassphrases(passphrases)
    }
  }, [debouncedSearchTerm, passphrases])

  return <>
    <FancyInput
      icon={<IconSearch />}
      noCopy
      placeholder="Search passphrases"
      type="search"
      label="Search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />

    <AnimatePresence>
      {debouncedSearchTerm && debouncedSearchTerm.length > 0 &&
        <motion.p
          initial={{ opacity: 0, margin: "-2.3rem" }}
          animate={{ opacity: 1, margin: "0" }}
          exit={{ opacity: 0, margin: "-2.3rem" }}
          className="text-sm text-gray-500 dark:text-gray-400">
          {filteredPassphrases.length > 0
            ? <>
              {filteredPassphrases.length} result{filteredPassphrases.length > 1 ? "s" : ""} found</>
            : "No results found"
          }
        </motion.p>
      }
    </AnimatePresence>

    <motion.ul
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
      exit={{ opacity: 0 }}
    >

      <AnimatePresence>
        {filteredPassphrases.map((passphrase) =>
          <motion.li
            key={passphrase.id}
            initial={{ opacity: 0, marginTop: "-5.25rem" }}
            animate={{ opacity: 1, marginTop: 0 }}
            exit={{ opacity: 0, marginTop: "-5.25rem" }}
          >
            <PassphraseCard {...passphrase} />
          </motion.li>
        )}
      </AnimatePresence>
    </motion.ul>
  </>
}

export default PassphraseList
