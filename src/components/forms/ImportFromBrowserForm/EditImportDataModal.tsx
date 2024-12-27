import Modal from "@/components/utility/Modal"
import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import SelectableCSVRow from "./SelectableCSVRow"

interface EditImportDataModalProps {
  acceptableCount: number
  badEntries: CSVLineEntry[]
  setBadEntries: (badEntries: CSVLineEntry[]) => void
  isOpen: boolean
  closeModal: () => void
  onContinue: (editedEntries: CSVLineEntry[]) => void
}

const EditImportDataModal: FC<EditImportDataModalProps> = ({
  acceptableCount, badEntries, setBadEntries,
  closeModal, isOpen, onContinue
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Record<
    number, boolean
  >>({
    0: true
  })

  useEffect(() => {
    setSelectedEntries({ 0: true })
    badEntries.forEach((_, index) =>
      selectedEntries[index] === undefined &&
      setSelectedEntries({ ...selectedEntries, [index - 1]: true })
    )
  }, [isOpen])

  const toggleAll = () => {
    setSelectedEntries(Object.keys(selectedEntries).reduce((all, key) => ({
      ...all,
      [key]: Object.values(selectedEntries).includes(false)
    }), {}))
  }

  if (!badEntries.length) return null

  return <Modal
    isOpen={isOpen}
    close={closeModal}
    size="lg"
    persist
    title="Unacceptable Entries Found"
    buttons={[{
      type: "button",
      children: "Cancel",
      color: "danger",
      onClick: closeModal
    }, {
      type: "button",
      children: `Go with ${Object
        .values(selectedEntries)
        .filter(Boolean).length
        + acceptableCount
        } entries`,
      onClick: () => onContinue(badEntries.filter((_, index) =>
        selectedEntries[index - 1]
      ))
    }]}
  >
    <p className="font-bold">
      {acceptableCount} acceptable entr{
        acceptableCount < 2 ? "y " : "ies "
      } found but there {
        badEntries.length < 2 ? "is " : "are "
      } also {badEntries.length - 1} unacceptable entr{
        badEntries.length < 2 ? "y " : "ies "
      }
    </p>

    <h2 className="text-xl font-bold text-creamcan-500">
      Entries must follow these rules:
    </h2>

    <ul className="list-disc ml-4 list-inside">
      <li>All areas except notes must be filled, notes are optional</li>

      <li>Must have a passphrase between 8-4096 characters</li>

      <li>Must have a passphrase is not in the brute force list</li>
    </ul>

    <hr className="my-4 h-px border-none bg-gradient-to-l from-transparent
      via-tuatara-500 to-transparent"
    />

    <table className="table-auto w-full border-separate min-w-[36rem]">
      <thead>
        <tr>
          <th
            className={classNames(
              "rounded-tl-lg bg-tuatara-50 dark:bg-tuatara-800",
              "w-8 h-8 cursor-pointer border-2", {
              "border-leaf-500":
                !Object.values(selectedEntries).includes(false),
              "border-creamcan-500":
                Object.values(selectedEntries).includes(false)
                && Object.values(selectedEntries).includes(true),
              "border-transparent":
                !Object.values(selectedEntries).includes(true)
            })}
            tabIndex={0}
            onKeyDown={(event) => [
              "Enter",
              " "
            ].includes(event.key) && toggleAll()}
            onClick={toggleAll}
          >
            <div className={classNames({
              "border-l-2 border-b-2 border-leaf-500 ml-1.5":
                !Object.values(selectedEntries).includes(false),
              "-rotate-45 -mt-1 w-4 h-2":
                !Object.values(selectedEntries).includes(false),
              "w-4 border-b-2 border-creamcan-500 ml-1.5":
                Object.values(selectedEntries).includes(false)
                && Object.values(selectedEntries).includes(true),
              "opacity-0 scale-0":
                !Object.values(selectedEntries).includes(true),
            })} />
          </th>

          {badEntries[0].map((entry, index) =>
            <th
              key={index}
              className="bg-tuatara-50 dark:bg-tuatara-800 px-2
              text-left last:rounded-tr-lg"
            >
              {entry}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {badEntries
          .filter((_, index) => index !== 0)
          .map((entry, index) => {
            // Register the entry as selected
            if (selectedEntries[index] === undefined)
              setSelectedEntries({ ...selectedEntries, [index]: true })
            return <SelectableCSVRow
              key={index + 1}
              entry={entry}
              setEntry={(newEntry) => {
                setBadEntries(badEntries.map((entry, row) => row === index + 1
                  ? newEntry
                  : entry
                ))
              }}
              isSelected={selectedEntries[index]}
              toggleSelection={() => setSelectedEntries({
                ...selectedEntries,
                [index]: !selectedEntries[index]
              })}
              isLast={index + 1 === badEntries.length - 1}
            />
          })}
      </tbody>
    </table>
  </Modal>
}

export default EditImportDataModal
