import classNames from "classnames"
import { FC } from "react"

interface ISelectableCSVRowProps {
  entry: CSVLineEntry
  setEntry: (entries: CSVLineEntry) => void
  isSelected: boolean
  toggleSelection: () => void
  isLast: boolean
}

const SelectableCSVRow: FC<ISelectableCSVRowProps> = ({
  entry, isSelected, toggleSelection,
  isLast, setEntry
}) => {
  return <tr>
    <td
      tabIndex={0}
      onClick={toggleSelection}
      onKeyDown={(event) => [
        "Enter",
        " "
      ].includes(event.key) && toggleSelection()}
      className={classNames(
        "bg-tuatara-50 dark:bg-tuatara-800",
        "cursor-pointer w-8 h-8 border-2 transition-all", {
        "rounded-bl-lg": isLast,
        "border-leaf-500": isSelected,
        "border-transparent": !isSelected
      })}
    >
      <div className={classNames(
        "border-l-2 border-b-2 border-leaf-500 ml-1.5",
        "-rotate-45 -mt-1 w-4 h-2 transition-all", {
        "opacity-0 scale-0": !isSelected
      })} />
    </td>

    {entry.map((value, index) =>
      <td
        key={index}
        className={classNames({
          "bg-white dark:bg-tuatara-950": true,
          "rounded-br-lg": isLast && index === entry.length - 1
        })}
      >
        <input
          type="text"
          value={value}
          onChange={(event) => {
            const newEntry = entry
            newEntry[index] = event.target.value
            setEntry(newEntry)
          }}
          className={classNames(
            "bg-transparent w-full p-1 min-w-0 transition-all", {
            "opacity-25": !isSelected
          })}
          disabled={!isSelected}
        />
      </td>
    )}
  </tr>
}

export default SelectableCSVRow
