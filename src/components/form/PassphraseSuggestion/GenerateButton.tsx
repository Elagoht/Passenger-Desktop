import { IconDice1, IconDice2, IconDice3, IconDice4, IconDice5, IconDice6 } from "@tabler/icons-react"
import { FC, createElement, useState } from "react"
import Button from "../Button"

interface IGenerateButtonProps {
  setFieldValue: (field: string, value: string) => void
}

const diceIcons = [
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6
]

const changedDiceIcon = (currentIcon: number) => {
  let newIcon = Math.floor(Math.random() * 6)
  if (newIcon === currentIcon)
    newIcon = changedDiceIcon((currentIcon + 1) % 6)
  return newIcon
}

const GenerateButton: FC<IGenerateButtonProps> = ({ setFieldValue }) => {
  const [diceIcon, setDiceIcon] = useState<number>(
    Math.floor(Math.random() * 6)
  )

  return <Button
    rightIcon={createElement(diceIcons[diceIcon])}
    type="button"
    variant="ghost"
    color="secondary"
    onClick={() => {
      setFieldValue(
        "passphrase",
        "generated"
      )
      setDiceIcon(changedDiceIcon(diceIcon))
    }}
  >
    Generate
  </Button>

}

export default GenerateButton
