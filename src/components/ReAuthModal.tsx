import { FC } from "react"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import Modal from "./utility/Modal"
import ReAuthForm from "./forms/ReAuthForm"

const ReAuthModal: FC = () => {
  const doesRequireReAuth = useAuthorizationSlice(state => state.doesRequireReAuth)

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
