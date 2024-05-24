import { FC, useState } from "react"
import Modal from "../utilities/Modal"
import Button from "../form/Button"
import Commands from "../../api/cli"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import { IconBox, IconFlame, IconTrash } from "@tabler/icons-react"
import { usePassphrasesSlice } from "../../stores/passphrases"
import { useNavigate } from "react-router-dom"

interface IPassphraseDeleteButtonProps {
  id: string
}

const PassphraseDeleteButton: FC<IPassphraseDeleteButtonProps> = ({ id }) => {
  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)
  const deletePassphrase = usePassphrasesSlice(state => state.deletePassphrase)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return <>
    <Button
      type="button" // Prevent form submission
      color="danger"
      variant="ghost"
      className="mt-1"
      rightIcon={<IconFlame size={24} />}
      onClick={() => setIsModalOpen(true)}
    >
      Lost Permanently
    </Button>

    <Modal
      isOpen={isModalOpen}
      close={() => setIsModalOpen(false)}
      title="Delete Passphrase"
      size="sm"
      persist
      buttons={[
        {
          children: "Yes, Delete",
          rightIcon: <IconTrash size={24} />,
          color: "danger",
          onClick: () => Commands.delete(
            accessToken,
            id
          ).then((response) => addNotification({
            title: response.success
              ? "Passphrase Deleted"
              : "Failed to Delete Passphrase",
            message: response.success
              ? "Lost forever."
              : response.output,
            type: response.success
              ? "success"
              : "error"
          })
          ).then(() =>
            deletePassphrase(id)
          ).then(() =>
            navigate("/passphrases")
          ).finally(() =>
            setIsModalOpen(false)
          )
        }, {
          children: "No, Keep It",
          rightIcon: <IconBox size={24} />,
          onClick: () => setIsModalOpen(false)
        },
      ]}>
      <p>Are you sure you want to delete this passphrase?</p>
    </Modal >
  </>
}

export default PassphraseDeleteButton
