import classNames from "classnames"
import { FC, createElement } from "react"
import { useWindow } from "../../../stores/window"
import menuItems from "./navbar"

const NavBar: FC = () => {
  const window = useWindow(state => state.window)
  const setWindow = useWindow(state => state.setWindow)

  return <nav className="fixed bottom-0 left-0 right-0 p-2 grid grid-cols-5 bg-tuatara-50 dark:bg-tuatara-900">

    {menuItems.map((item, index) =>
      <button
        key={index}
        className={classNames({
          "p-2 flex justify-center items-center transition-all ease-in-out duration-300 rounded-lg": true,
          "bg-tuatara-100 dark:bg-tuatara-800": window === item.slug,
        })}
        onClick={() => setWindow(item.slug)}
      >
        {createElement(
          item.icon,
          {
            size: 48,
            strokeWidth: 1.25,
            className: classNames({
              "text-creamcan-600 dark:text-creamcan-300": window !== item.slug,
              "text-leaf-600 dark:text-leaf-300": window === item.slug,
            })
          }
        )}
      </button>
    )}
  </nav >
}

export default NavBar