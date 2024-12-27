import { IconChevronLeft, IconChevronLeftPipe, IconChevronRight, IconChevronRightPipe } from "@tabler/icons-react"
import classNames from "classnames"
import { FC } from "react"

interface IPaginatorProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Paginator: FC<IPaginatorProps> = ({
  totalPages, currentPage, onPageChange
}) => {
  const SEEK_DISTANCE = 2

  const pages = Array.from({ length: totalPages }).map((_, index) => index + 1)
  const visiblePages = pages.filter((page) =>
    Math.abs(page - currentPage) <= SEEK_DISTANCE
  )

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  return <nav className="flex items-center justify-center gap-2 mt-4">
    <button
      className={classNames(
        "grid place-items-center h-8 w-8 rounded-full",
        " bg-tuatara-200 dark:bg-tuatara-500", {
        "opacity-50 cursor-not-allowed": currentPage === 1
      })}
      onClick={() => handlePageChange(1)}
      disabled={currentPage === 1}
    >
      <IconChevronLeftPipe />
    </button>

    <button
      className={classNames(
        "grid place-items-center h-8 w-8 rounded-full",
        " bg-tuatara-200 dark:bg-tuatara-500", {
        "opacity-50 cursor-not-allowed": currentPage === 1
      })}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <IconChevronLeft />
    </button>

    {visiblePages.map((page) =>
      <button
        key={page}
        className={classNames(
          "h-8 w-8 rounded-full grid place-items-center cursor-pointer", {
          "bg-tuatara-200 dark:bg-tuatara-500": page !== currentPage,
          "bg-leaf-500 text-white": page === currentPage
        })}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    )}

    <button
      className={classNames(
        "grid place-items-center h-8 w-8 rounded-full",
        " bg-tuatara-200 dark:bg-tuatara-500", {
        "opacity-50 cursor-not-allowed": currentPage === totalPages
      })}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <IconChevronRight />
    </button>

    <button
      className={classNames(
        "grid place-items-center h-8 w-8 rounded-full",
        " bg-tuatara-200 dark:bg-tuatara-500", {
        "opacity-50 cursor-not-allowed": currentPage === totalPages
      })}
      onClick={() => handlePageChange(totalPages)}
      disabled={currentPage === totalPages}
    >
      <IconChevronRightPipe />
    </button>
  </nav>
}

export default Paginator