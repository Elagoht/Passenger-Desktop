import { FC } from "react"
import Window from "@/components/layout/Window"
import GoBackHeader from "@/components/layout/GoBackHeader"
import ExportToCSVForm from "@/components/forms/ExportToCSVForm"

const WinExportToCSV: FC = () => {
  return <Window>
    <GoBackHeader
      title="Export to CSV"
      href="/settings"
    />

    <article className="prose dark:prose-invert">
      <p>
        {/* TODO: Place a link to the Passenger documentation here */}
        Are you moving passenger? Or you plan to use a "unique✨ Passenger client"?
      </p>

      <p>
        You can export your data to a CSV file in two methods:
      </p>

      <ul>
        <li>
          <div><strong>Bare</strong> - human-readable</div>

          <small className="text-red-500">Don't show anyone!</small>
        </li>

        <li>
          <div><strong>Encrypted</strong> - not human-readable</div>

          <small className="text-creamcan-500">
            Each line will encrypt with base64. Human eye can't read it, <span className="text-red-500">but computer can!</span>
          </small>
        </li>
      </ul>
    </article>

    <ExportToCSVForm />
  </Window>
}

export default WinExportToCSV
