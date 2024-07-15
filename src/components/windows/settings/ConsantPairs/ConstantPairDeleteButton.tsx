import Button from "@/components/formElements/Button"
import Modal from "@/components/utility/Modal"
import handleResponse from "@/helpers/services"
import { useAuth } from "@/hooks/authorization"
import { forgetConstantPair } from "@/services/constantPairServices"
import { ConstantPair } from "@/types/common"
import { IconBox, IconDatabaseExclamation, IconTrash } from "@tabler/icons-react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

interface IConstantPairDeleteButtonProps {
  constantKey: ConstantPair["key"]
}

const ConstantPairDeleteButton: FC<IConstantPairDeleteButtonProps> = ({ constantKey }) => {
  const navigate = useNavigate()

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
            useAuth(),
            constantKey
          ).then((response) => handleResponse(
            response,
            [() => navigate("/settings/constant-pairs"), {
              successTitle: "Vault forgotten",
              successMessage: "Constant pair deleted successfully",
              successIcon: IconTrash
            }],
            [() => void 0, {
              errorTitle: "Deletion failed",
              errorMessage: "An error occurred while deleting the constant pair.",
              errorIcon: IconDatabaseExclamation
            }]
          ))
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
