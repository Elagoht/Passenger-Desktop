import { FC } from "react"
import { ListablePassphrase } from "../../types/common"
import PassphraseCard from "."

const passphrases: ListablePassphrase[] = [
  {
    id: "1",
    platform: "Facebook",
    username: null,
    email: "john@doe.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "Twitter",
    username: "john_doe",
    email: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Instagram",
    username: "john_doe",
    email: "john@doe.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const PassphraseCardList: FC = () => {
  return <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {
      passphrases.map((passphrase) =>
        <PassphraseCard {...passphrase} />
      )
    }
  </div>
}

export default PassphraseCardList
