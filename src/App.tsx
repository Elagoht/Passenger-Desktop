import { FC } from "react"
import { useAuthorizationSlice } from "./stores/authorization"
import LoginForm from "./windows/LoginWin"
import WindowManager from "./windows/WindowManager"

const App: FC = () => {
  const isAuthorized = useAuthorizationSlice((state) => state.isAuthorized)

  return isAuthorized
    ? <WindowManager />
    : <LoginForm />
}

export default App