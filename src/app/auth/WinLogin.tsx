import { FC } from "react"
import AuthForm from "@/components/forms/AuthForm"
import Window from "@/components/layout/Window"

const WinLogin: FC = () => {
  return <Window center>
    <AuthForm mode="login" />
  </Window>
}

export default WinLogin