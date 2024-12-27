import classNames from "classnames"
import { FC, createElement } from "react"
import menuItems from "./navbar"
import { Link, useLocation } from "react-router-dom"

const NavBar: FC = () => {
  const { pathname } = useLocation()

  return <nav className="p-1 md:p-2 z-10 shadow-modal shadow-tuatara-200
    dark:shadow-tuatara-950 bg-tuatara-50 dark:bg-tuatara-900 md:flex
    md:flex-col md:h-screen md:top-0 md:sticky md:w-56 max-md:grid
    max-md:w-full max-md:grid-cols-5 max-md:fixed max-md:bottom-0"
  >
    <header className="flex items-center justify-center gap-2
      p-2 mb-2 max-md:hidden"
    >
      <img
        src="/icon.png"
        alt="Passenger"
        width={32}
        height={32}
        draggable="false"
      />

      <h1 className="text-xl font-medium text-center text-tuatara-500
        dark:text-tuatara-400"
      >
        Passenger
      </h1>
    </header>


    {menuItems.map((item, index) =>
      <Link
        key={index}
        draggable="false"
        className={classNames(
          "p-2 md:gap-2 flex items-center justify-center transition-all",
          "ease-in-out duration-300 rounded-lg", {
          "bg-tuatara-100 dark:bg-tuatara-800 text-creamcan-600":
            pathname.startsWith(item.path),
          "dark:text-creamcan-300":
            pathname.startsWith(item.path)
        })}
        to={item.path}
      >
        {createElement(item.icon, {
          size: 32,
          strokeWidth: 1.5,
          className: "shrink-0"
        })}

        <span className="max-md:hidden flex-1">
          {item.title}
        </span>
      </Link>
    )}
  </nav>
}

export default NavBar