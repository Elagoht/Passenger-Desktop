import { IconDice1, IconDice2, IconDice3, IconDice4, IconDice5, IconDice6 } from "@tabler/icons-react"
import { FC, createElement, useState } from "react"
import Button from "@/components/formElements/Button"
import { useNotificationSlice } from "@/lib/stores/notification"
import StringHelper from "@/helpers/string"
import { generatePassphrase } from "@/services/generationServices"

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
  const addNotification = useNotificationSlice(state => state.addNotification)

  const [diceIcon, setDiceIcon] = useState<number>(
    Math.floor(Math.random() * 6)
  )

  return <Button
    rightIcon={createElement(diceIcons[diceIcon])}
    type="button"
    variant="ghost"
    color="secondary"
    onClick={() => generatePassphrase(
      32
    ).then((response) => {
      if (response.status !== 0) return addNotification({
        type: "error",
        title: "Failed to generate passphrase",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
      setFieldValue("passphrase", response.stdout)
    }).finally(() =>
      setDiceIcon(changedDiceIcon(diceIcon))
    )}
  >
    Generate
  </Button>

}

export default GenerateButton
