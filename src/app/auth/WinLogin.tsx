import { FC } from "react"
import AuthForm from "../../components/auth/AuthForm"
import Window from "../../components/layout/Window"

const WinLogin: FC = () => {

  return <Window>
    <AuthForm mode="login" />
  </Window>
}

export default WinLogin