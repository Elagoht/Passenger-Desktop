import { FC } from "react"
import { IconKey, IconLock, IconLockOpen, IconMoodLookDown, IconMoodSmile } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { loginToPassenger } from "@/services/authServices"
import StringHelper from "@/helpers/string"
import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
const ReAuthForm: FC = () => {
  const setDoesRequireReAuth = authStore(state => state.setDoesRequireReAuth)
  const setAccessToken = authStore(state => state.setAccessToken)
  const addNotification = toastStore(state => state.addToast)

  return <Formik
    initialValues={{
      username: "",
      passphrase: ""
    }}
    onSubmit={(values, { setSubmitting, setValues }) =>
      loginToPassenger(
        values.username,
        values.passphrase
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          title: "Access denied",
          type: "error",
          icon: <IconMoodLookDown size={32} />,
          message: StringHelper.removeUnixErrorPrefix(response.stderr)
        })
        setAccessToken(response.stdout)
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
    }
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
}

export default ReAuthForm
