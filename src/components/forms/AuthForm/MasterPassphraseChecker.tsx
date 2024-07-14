import { IconCheck, IconX } from "@tabler/icons-react"
import { FC } from "react"

interface IMasterPassphraseCheckerProps {
  passphrase: string
}

const MasterPassphraseChecker: FC<IMasterPassphraseCheckerProps> = ({ passphrase }) => <>
  <p className="text-sm -mb-4">
    Must have criterias:
  </p>

  <ul className="text-sm">
    {criterias.map((criteria, index) =>
      <li
        key={index}
        className="flex items-center gap-1"
      >
        {criteria.regex.test(passphrase)
          ? <IconCheck
            size={16}
            color="green" />
          : <IconX
            size={16}
            color="red"
          />
        }

        {criteria.message}
      </li>
    )}
  </ul>
</>

const criterias = [{
  regex: /.{12,}/,
  message: "At least 12 characters"
}, {
  regex: /[A-Z]/,
  message: "At least one uppercase letter"
}, {
  regex: /[a-z]/,
  message: "At least one lowercase letter"
}, {
  regex: /\d/,
  message: "At least one digit"
}, {
  regex: /[^A-Za-z0-9]/,
  message: "At least one special character"
}]

export default MasterPassphraseChecker