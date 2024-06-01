import { FC } from "react"
import GenerateButton from "./GenerateButton"
import ManipulateButton from "./ManipulateButton"

interface IPassphraseSuggestionProps {
  setFieldValue: (field: string, value: string) => void
}

const PassphraseSuggestion: FC<IPassphraseSuggestionProps> = ({ setFieldValue }) => {
  return <div className="grid grid-cols-2 gap-2">
    <GenerateButton setFieldValue={setFieldValue} />

    <ManipulateButton setFieldValue={setFieldValue} />
  </div>


}

export default PassphraseSuggestion
