import { IconKey, IconLock, IconLockOpen, IconMoodLookDown, IconMoodSmile } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import Service from "../../services"
import StringHelper from "../../helpers/string"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import Button from "../form/Button"
import Input from "../form/Input"
import Modal from "../utilities/Modal"

const ReAuthModal: FC = () => {
  const doesRequireReAuth = useAuthorizationSlice(state => state.doesRequireReAuth)
  const setDoesRequireReAuth = useAuthorizationSlice(state => state.setDoesRequireReAuth)
  const setAccessToken = useAuthorizationSlice(state => state.setAccessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Modal
    isOpen={doesRequireReAuth}
    persist
    size="sm"
    close={() => void 0}
  >
    <Formik
      initialValues={{
        username: "",
        passphrase: ""
      }}
      onSubmit={(values, { setSubmitting, setValues }) => {
        Service.login(
          values.username,
          values.passphrase
        ).then((response) => {
          if (!response.success) return addNotification({
            title: "Access denied",
            type: "error",
            icon: <IconMoodLookDown size={32} />,
            message: StringHelper.removeUnixErrorPrefix(response.output)
          })
          setAccessToken(response.output)
          setDoesRequireReAuth(false)
          addNotification({
            type: "success",
            icon: <IconMoodSmile size={32} />,
            message: "Access granted, again!"
          })
          setValues({ // Clear the form for next time
            username: "",
            passphrase: ""
          })
        }).finally(
          () => setSubmitting(false)
        )
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid
      }) =>
        <Form className="flex flex-col gap-4 w-full p-4">
          <h1 className="text-2xl font-semibold text-creamcan-500">
            <IconLock
              size={32}
              className="mr-2 inline-block"
            />

            The vault lid closed by itself
          </h1>

          <p>
            Sessions are limited to 10 minutes. Unlock the vault again to continue.
          </p>

          <Input
            type="text"
            name="username"
            label="Username"
            iconLeft={IconMoodSmile}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && errors.username}
            success={touched.username && !errors.username}
          />

          <Input
            type="password"
            name="passphrase"
            label="Passphrase"
            iconLeft={IconKey}
            value={values.passphrase}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passphrase && errors.passphrase}
            success={touched.passphrase && !errors.passphrase}
          />

          <Button
            color="secondary"
            rightIcon={<IconLockOpen size={24} />}
            disabled={!isValid}
          >
            Re-unlock Vault
          </Button>
        </Form>
      }
    </Formik>

  </Modal>
}

export default ReAuthModal
