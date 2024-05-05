import { FC, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import WindowMachine from "./components/WindowMachine"
import { useAuthorizationSlice } from "./stores/authorization"
import PasswordWin from "./windows/PasswordWin"

const App: FC = () => {
  const isAuthorized = useAuthorizationSlice((state) => state.isAuthorized)


  useEffect(() => {
    const body = document.querySelector("html") as HTMLElement

    const onFocus = () => {
      body.classList.add("focused")
      body.classList.remove("blurred")
    }
    const onBlur = () => {
      body.classList.remove("focused")
      body.classList.add("blurred")
    }

    window.addEventListener("focus", onFocus)
    window.addEventListener("blur", onBlur)

    return () => {
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("blur", onBlur)
    }
  }, [])

  return isAuthorized
    ? <WindowMachine mainWin={<PasswordWin />} />
    : <LoginForm />
}

export default App