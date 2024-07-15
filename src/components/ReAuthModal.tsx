import { FC } from "react"
import ReAuthForm from "./forms/ReAuthForm"
import Modal from "./utility/Modal"
import { authStore } from "@/lib/stores/authorization"

const ReAuthModal: FC = () => {
  const isReAuthModalOpen = authStore((state) => state.isReAuthModalOpen)

  return <Modal
    isOpen={isReAuthModalOpen}
    persist
    size="sm"
    close={() => void 0}
  >
    <ReAuthForm />
  </Modal>
}

export default ReAuthModal
