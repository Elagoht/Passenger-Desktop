import { IconPlus } from "@tabler/icons-react"
import { FC } from "react"
import { Link } from "react-router-dom"
import ConstantPairList from "../../../components/settings/ConsantPairs/ConstantPairList"
import Button from "../../../components/form/Button"
import GoBackHeader from "../../../components/layout/GoBackHeader"
import Window from "../../../components/layout/Window"

const WinConstantPairs: FC = () => {
  return <Window compact>
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

    <ConstantPairList />
  </Window>
}

export default WinConstantPairs
