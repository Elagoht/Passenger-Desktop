import { FC } from "react"
import AuthForm from "../../components/auth/AuthForm"
import Window from "../../components/layout/Window"

const WinRegister: FC = () => {

  return <Window>
    <AuthForm mode="register" />
  </Window>
}

export default WinRegister
