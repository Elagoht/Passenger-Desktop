import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import Cookie from "@/helpers/cookies"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { loginToPassenger } from "@/services/authServices"
import { IconKey, IconLock, IconLockOpen, IconMoodLookDown, IconMoodSmile } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
const ReAuthForm: FC = () =>
  <Formik
    initialValues={{
      username: "",
      passphrase: ""
    }}
    onSubmit={(values, { setSubmitting, setValues }) =>
      loginToPassenger(
        values.username,
        values.passphrase
      ).then((response) => handleResponse(
        response,
        [() => {
          Cookie.set("accessToken", response.stdout)
          authStore((state) => state.logInUser)()
        }, {
          successTitle: "Access granted, again!",
          successMessage: "Continue where you left off.",
          successIcon: IconMoodSmile
        }],
        [() => void 0, {
          errorTitle: "Access denied",
          errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr),
          errorIcon: IconMoodLookDown
        }]
      )).then(() => setValues({
        username: "",
        passphrase: ""
      })).finally(
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

export default ReAuthForm
