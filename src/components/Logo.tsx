import { FC } from "react"

const Logo: FC = () => {
  return <header className="flex items-center gap-4">
    <img src="/icon.png"
      width={128}
      height={128}
      alt="Passenger"
    />

    <div className="flex flex-col gap-1">
      <h1 className="text-5xl font-bold">
        Passenger
      </h1>

      <p className="text-tuatara-800 dark:text-tuatara-200">
        The Passphrase Manager You Trust
      </p>
    </div>
  </header>
}

export default Logo
