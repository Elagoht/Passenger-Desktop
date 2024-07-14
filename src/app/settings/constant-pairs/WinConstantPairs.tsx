import { IconDatabaseExclamation, IconPlus } from "@tabler/icons-react"
import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "@/components/formElements/Button"
import GoBackHeader from "@/components/layout/GoBackHeader"
import Window from "@/components/layout/Window"
import ConstantPairList from "@/components/windows/settings/ConsantPairs/ConstantPairList"
import Loading from "@/components/layout/Loading"
import { authStore } from "@/lib/stores/authorization"
import { ConstantPair } from "@/types/common"
import { fetchAllConstantPairs } from "@/services/constantPairServices"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"

const WinConstantPairs: FC = () => {
  const accessToken = authStore((state) => state.accessToken)

  const [constants, setConstants] = useState<ConstantPair[]>()

  useEffect(() => {
    fetchAllConstantPairs(
      accessToken
    ).then((response) => handleResponse(
      response,
      [() => setConstants(StringHelper.deserialize<ConstantPair[]>(response.stdout) ?? undefined)],
      [() => void 0, {
        errorTitle: "Failed to fetch constant pairs",
        errorIcon: IconDatabaseExclamation
      }]
    ))
  }, [])

  if (!constants) return <Loading />

  return <Window>
    <GoBackHeader
      href="/settings"
      title="Constant Pairs"
    />

    <fieldset className="leading-normal text-sm border border-leaf-600 dark:border-leaf-400 bg-gradient-to-tl dark:from-leaf-900 dark:to-leaf-700 border-opacity-20 from-leaf-300 to-leaf-100 dark:border-opacity-20 rounded p-4 grid gap-2">
      <p>
        Constants are key-value pairs holds a shortcode of a value. Unlike passphrases; emails or usernames can be same on different services.
      </p>

      <p>
        You can use a constant named <code className="text-leaf-500">workMail</code> by writing <code className="text-leaf-500">_$workMail</code> in the identity fields.
      </p>
    </fieldset>

    <Link
      to="/settings/new-constant-pair"
      className="my-2"
      draggable="false"
    >
      <Button
        color="secondary"
        rightIcon={<IconPlus size={24} />}
      >
        Declare New
      </Button>
    </Link>

    <ConstantPairList constants={constants} />
  </Window>
}

export default WinConstantPairs
