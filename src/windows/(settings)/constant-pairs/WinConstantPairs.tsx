import { FC } from "react"
import Window from "../../../components/layout/Window"
import ConstantPairList from "../../../components/(settings)/ConsantPairs/ConstantPairList"

const WinConstantPairs: FC = () => {
  return <Window compact>
    <h1 className="text-2xl text-creamcan-500 font-medium">Constant Pairs</h1>

    <fieldset className="leading-normal text-sm border border-leaf-600 dark:border-leaf-400 bg-leaf-500 bg-opacity-20 border-opacity-20 dark:bg-opacity-20 dark:border-opacity-20 rounded p-4 grid gap-2 my-2">
      <p>
        Constants are key-value pairs holds a shortcode of a value. Unlike passphrases; emails or usernames can be same on different services.
      </p>

      <p>
        You can use a constant named <code className="text-leaf-500">workMail</code> by writing <code className="text-leaf-500">_$workMail</code> in the identity fields.
      </p>
    </fieldset>

    <ConstantPairList />
  </Window>
}

export default WinConstantPairs
