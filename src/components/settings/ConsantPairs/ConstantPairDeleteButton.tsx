import { FC, useState } from "react"
import Button from "../../formElements/Button"
import { IconBox, IconDatabaseExclamation, IconTrash } from "@tabler/icons-react"
import { ConstantPair } from "../../../types/common"
import { useAuthorizationSlice } from "../../../lib/stores/authorization"
import { useNotificationSlice } from "../../../lib/stores/notification"
import { useNavigate } from "react-router-dom"
import StringHelper from "../../../helpers/string"
import Modal from "../../utility/Modal"
import { forgetConstantPair } from "../../../services/constantPairServices"

interface IConstantPairDeleteButtonProps {
  constantKey: ConstantPair["key"]
}

const ConstantPairDeleteButton: FC<IConstantPairDeleteButtonProps> = ({ constantKey }) => {
  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

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
