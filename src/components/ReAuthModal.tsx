import { FC } from "react"
import { authStore } from "@/lib/stores/authorization"
import Modal from "./utility/Modal"
import ReAuthForm from "./forms/ReAuthForm"

const ReAuthModal: FC = () => {
  const doesRequireReAuth = authStore(state => state.doesRequireReAuth)

  return <Modal
    isOpen={doesRequireReAuth}
    persist
    size="sm"
    close={() => void 0}
  >
    <ReAuthForm />
  </Modal>
}

export default ReAuthModal
