import { FC } from "react"
import Window from "../../../components/layout/Window"
import GoBackHeader from "../../../components/layout/GoBackHeader"
import ImportFromBrowserForm from "../../../components/forms/ImportFromBrowserForm"

const WinImportFromBrowser: FC = () => {
  return <Window compact>
    <GoBackHeader
      href="/settings"
      title="Import from browser"
    />
    <article className="prose dark:prose-invert">
      <p className="">
        Import passphrases from browser in 3 steps:
      </p>

      <ol className="pl-4 mt-2 list-inside">
        <li>Export passphrases from your browser,</li>
        <li>Select browser type and file,</li>
        <li>Import em all!</li>
      </ol>
    </article>

    <ImportFromBrowserForm />
  </Window>
}

export default WinImportFromBrowser
