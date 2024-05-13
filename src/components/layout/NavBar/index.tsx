import classNames from "classnames"
import { FC, createElement } from "react"
import menuItems from "./navbar"
import { Link, useLocation } from "react-router-dom"

const NavBar: FC = () => {
  const { pathname } = useLocation()

  return <nav className="fixed bottom-0 left-0 right-0 p-2 grid grid-cols-5 bg-tuatara-50 dark:bg-tuatara-900">

    {menuItems.map((item, index) =>
      <Link
        key={index}
        className={classNames({
          "p-2 flex justify-center items-center transition-all ease-in-out duration-300 rounded-lg": true,
          "bg-tuatara-100 dark:bg-tuatara-800": pathname === item.path,
        })}
        to={item.path}
      >
        {createElement(
          item.icon,
          {
            size: 48,
            strokeWidth: 1.25,
            className: classNames({
              "text-creamcan-600 dark:text-creamcan-300": pathname === item.path,
              "text-leaf-600 dark:text-leaf-300": pathname !== item.path,
            })
          }
        )}
      </Link>
    )}
  </nav>
}

export default NavBar