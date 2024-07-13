import { useAutoAnimate } from "@formkit/auto-animate/react"
import { IconMoodLookDown, IconSearch } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useEffect, useState } from "react"
import { ListableDatabaseEntry } from "../../types/common"
import FancyInput from "../form/FancyInput"
import PassphraseCard from "./PassphraseCard"
import Service from "../../services"
import { useAuthorizationSlice } from "../../lib/stores/authorization"
import { useNotificationSlice } from "../../lib/stores/notification"
import StringHelper from "../../helpers/string"
import Loading from "../layout/Loading"
import { Maybe } from "../../types/utility"

const PassphraseList: FC = () => {

  const [autoAnimateRef] = useAutoAnimate()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)
  const [passphrases, setPassphrases] = useState<Maybe<ListableDatabaseEntry[]>>(null)

  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    Service.fetchAll(
      accessToken
    ).then((response) => {
      if (response.status === 0) return setPassphrases(
        StringHelper.deserialize<ListableDatabaseEntry[]>(response.stdout)
      )
      addNotification({
        icon: <IconMoodLookDown size={32} />,
        title: "Could't fetch passphrases",
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
      setPassphrases([])
    })
  }, [])

  if (passphrases === null) return <Loading />

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
