import { FC } from "react"
import GenerateButton from "./GenerateButton"
import ManipulateButton from "./ManipulateButton"

interface IPassphraseSuggestionProps {
  currentPassphrase: string
  setFieldValue: (field: string, value: string) => void
}

const PassphraseSuggestion: FC<IPassphraseSuggestionProps> = ({
  currentPassphrase, setFieldValue
}) => {
  return <div className="grid grid-cols-2 gap-2">
    <GenerateButton setFieldValue={setFieldValue} />

    <ManipulateButton
      currentPassphrase={currentPassphrase}
      setFieldValue={setFieldValue}
    />
  </div>


}

export default PassphraseSuggestion
