import { FC } from "react"
import { useAuthorizationSlice } from "./stores/authorization"
import LoginForm from "./windows/LoginWin"
import MainWin from "./windows/MainWin"

const App: FC = () => {
  const isAuthorized = useAuthorizationSlice((state) => state.isAuthorized)

  return isAuthorized
    ? <MainWin />
    : <LoginForm />
}

export default App