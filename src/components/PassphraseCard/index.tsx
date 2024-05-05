import { FC } from "react"
import { ListablePassphrase } from "../../types/common"
import { IconCopy, IconDotsVertical } from "@tabler/icons-react"
import Copier from "./Copier"

interface IPassphraseCardProps extends ListablePassphrase { }

const PassphraseCard: FC<IPassphraseCardProps> = ({ email, id, platform, username }) => {
  return <div key={id} className="grid gap-2 p-3 shadow-lg rounded-md bg-white dark:bg-tuatara-950">
    <div className="flex justify-between items-center bg-nebula-300 dark:bg-nebula-700 -m-3 mb-0 p-3 rounded-t-md">
      <h3 className="text-lg font-semibold">{platform}</h3>

      <button className="p-1 rounded-full hover:bg-nebula-200 dark:hover:bg-nebula-800 transition-all">
        <IconDotsVertical size={24} />
      </button>
    </div>

    <div className="grid grid-cols-3 gap-1">
      {[{
        label: "Username", value: username
      }, {
        label: "Email", value: email
      }].map(({ label, value }) =>
        <div key={label} className="flex flex-col">
          <div className="line-clamp-1 text-sm text-center font-semibold">{label}</div>
          {value ?
            <Copier value={value} />
            : <span className="text-sm text-center text-tuatara-500 p-2">
              N/A
            </span>
          }
        </div>
      )}

      <div className="flex flex-col">
        <span className="line-clamp-1 text-sm font-semibold">Passphrase</span>
        <button className="p-1 rounded-full bg-tuatara-100 dark:bg-tuatara-900 hover:bg-tuatara-200 dark:hover:bg-tuatara-800 transition-all shadow-inner flex items-center gap-2 justify-center">
          <div className="line-clamp-1">Copy</div>
          <IconCopy className="shrink-0" />
        </button>
      </div>
    </div>
  </div>
}

export default PassphraseCard
