import Button from "@/components/formElements/Button"
import Modal from "@/components/utility/Modal"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { deleteEntry } from "@/services/passphraseServices"
import { IconBox, IconFlame, IconTrash } from "@tabler/icons-react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

interface IPassphraseDeleteButtonProps {
  id: string
}

const PassphraseDeleteButton: FC<IPassphraseDeleteButtonProps> = ({ id }) => {
  const navigate = useNavigate()

  const accessToken = authStore(state => state.accessToken)
  const addNotification = toastStore(state => state.addToast)

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
          onClick: () => deleteEntry(
            accessToken,
            id
          ).then((response) => addNotification({
            title: response.status === 0
              ? "Passphrase Deleted"
              : "Failed to Delete Passphrase",
            message: response.status === 0
              ? "Lost forever."
              : StringHelper.removeUnixErrorPrefix(response.stderr),
            type: response.status === 0
              ? "success"
              : "error"
          })
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
    </Modal>
  </>
}

export default PassphraseDeleteButton
