import { FC, useEffect } from "react"
import WindowMachine from "./components/WindowMachine"
import { useWindowSlice } from "./stores/window"

const App: FC = () => {
  const windowHistory = useWindowSlice((state) => state.windowHistory)
  const openWindow = useWindowSlice((state) => state.openWindow)

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

  return <>
    <WindowMachine />

    <button
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-2 bg-tuatara-500 text-white rounded-full transition-all"
      onClick={() => {
        openWindow({
          id: `window-${windowHistory.length + 1}`,
          title: `Window ${windowHistory.length + 1}`
        })
      }}
    >
      Open Window
    </button>
  </>
}

export default App