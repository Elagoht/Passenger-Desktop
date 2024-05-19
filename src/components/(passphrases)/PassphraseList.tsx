import { useAutoAnimate } from "@formkit/auto-animate/react"
import { IconSearch } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState } from "react"
import { usePassphrasesSlice } from "../../stores/passphrases"
import { ListablePassphrase } from "../../types/common"
import FancyInput from "../form/FancyInput"
import PassphraseCard from "./PassphraseCard"

const PassphraseList: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)

  const [autoAnimateRef] = useAutoAnimate()

  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredPassphrases = passphrases.filter((passphrase: ListablePassphrase) => {
    const search = searchTerm.toLowerCase()
    return passphrase.platform.toLowerCase().includes(search)
      || passphrase.username?.toLowerCase()?.includes(search)
      || passphrase.email?.toLowerCase()?.includes(search)
  })

  return <>
    <p className="text-center">
      {passphrases.length} passphrase{passphrases.length > 1
        ? "s are "
        : " is "
      }safe in your vault
    </p>

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
      {searchTerm.length > 0 &&
        <motion.p
          initial={{ opacity: 0, marginTop: "-2.6rem" }}
          animate={{ opacity: 1, marginTop: "0" }}
          exit={{ opacity: 0, marginTop: "-2.6rem" }}
          className="text-sm text-gray-500 dark:text-gray-400">
          {filteredPassphrases.length > 0
            ? <>
              {filteredPassphrases.length} result{filteredPassphrases.length > 1 ? "s" : ""} found</>
            : "No results found"
          }
        </motion.p>
      }
    </AnimatePresence>

    <ul
      ref={autoAnimateRef}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
    >
      {filteredPassphrases
        .map((passphrase) =>
          <PassphraseCard
            key={passphrase.id}
            {...passphrase}
          />
        )}
    </ul>
  </>
}

export default PassphraseList
