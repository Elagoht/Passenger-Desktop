import { FC, useState } from "react"
import { IconBox, IconDatabaseExclamation, IconTrash } from "@tabler/icons-react"
import { ConstantPair } from "@/types/common"
import { useNavigate } from "react-router-dom"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import Button from "@/components/formElements/Button"
import Modal from "@/components/utility/Modal"
import { forgetConstantPair } from "@/services/constantPairServices"
import StringHelper from "@/helpers/string"

interface IConstantPairDeleteButtonProps {
  constantKey: ConstantPair["key"]
}

const ConstantPairDeleteButton: FC<IConstantPairDeleteButtonProps> = ({ constantKey }) => {
  const navigate = useNavigate()

  const accessToken = authStore((state) => state.accessToken)
  const addNotification = toastStore((state) => state.addToast)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return <>
    <Button
      type="button" // Prevent form submission
      color="danger"
      variant="ghost"
      className="mt-auto"
      rightIcon={<IconTrash size={24} />}
      onClick={() => setIsModalOpen(true)}
    >
      Delete
    </Button>

    <Modal
      isOpen={isModalOpen}
      close={() => setIsModalOpen(false)}
      title="Delete Constant Pair"
      size="sm"
      persist
      buttons={[
        {
          type: "button",
          children: "Yes, Delete",
          rightIcon: <IconTrash size={24} />,
          color: "danger",
          onClick: () => forgetConstantPair(
            accessToken,
            constantKey
          ).then((response) => {
            if (response.status !== 0) return addNotification({
              type: "error",
              title: "I can't forget it 😩",
              message: StringHelper.removeUnixErrorPrefix(response.stderr),
              icon: <IconDatabaseExclamation />
            })

            addNotification({
              icon: <IconTrash />,
              type: "success",
              title: "I forgot it 🤔",
              message: "Constant pair deleted successfully"
            })

            navigate("/settings/constant-pairs")
          })
        }, {
          type: "button",
          children: "No, Keep It",
          rightIcon: <IconBox size={24} />,
          onClick: () => setIsModalOpen(false)
        },
      ]}
    >
      <p>Are you sure you want to delete the constant pair?</p>
    </Modal>
  </>
}

export default ConstantPairDeleteButton
