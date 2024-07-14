import FancyInput from "@/components/formElements/FancyInput"
import { ListableDatabaseEntry } from "@/types/common"
import { IconSearch } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState } from "react"
import PassphraseCard from "./PassphraseCard"

interface IPassphraseListProps {
  passphrases: ListableDatabaseEntry[]
}

const PassphraseList: FC<IPassphraseListProps> = ({ passphrases }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredPassphrases = passphrases.filter((passphrase: ListableDatabaseEntry) => {
    const search = searchTerm.toLowerCase()
    return passphrase.platform.toLowerCase().includes(search)
      || passphrase.identity?.toLowerCase()?.includes(search)
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

    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
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
