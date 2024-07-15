import { FC, useEffect, useState } from "react"
import Window from "@/components/layout/Window"
import PassphraseList from "@/components/windows/passphrases/PassphraseList"
import Loading from "@/components/layout/Loading"
import { IconMoodLookDown } from "@tabler/icons-react"
import StringHelper from "@/helpers/string"
import { ListableDatabaseEntry } from "@/types/common"
import handleResponse from "@/helpers/services"
import { fetchAllEntries } from "@/services/passphraseServices"
import { Maybe } from "@/types/utility"
import { useAuth } from "@/hooks/authorization"

const WinPassphrases: FC = () => {
  const [passphrases, setPassphrases] = useState<Maybe<ListableDatabaseEntry[]>>(null)

  useEffect(() => {
    fetchAllEntries(
      useAuth()
    ).then((response) => handleResponse(
      response,
      [() => setPassphrases(
        StringHelper.deserialize<ListableDatabaseEntry[]>(response.stdout)
      )],
      [() => void 0, {
        errorTitle: "Couldn't fetch passphrases",
        errorIcon: IconMoodLookDown
      }]
    ))
  }, [])

  if (passphrases === null) return <Loading />

  return <Window wide>
    <div className="flex flex-col gap-6">
      <img
        src="/safe.webp"
        alt="Passphrases"
        width={256}
        height={256}
        draggable="false"
        className="mt-6 mx-auto max-h-[33%] aspect-square max-w-full object-contain"
      />

      <PassphraseList passphrases={passphrases} />
    </div>
  </Window>
}

export default WinPassphrases
