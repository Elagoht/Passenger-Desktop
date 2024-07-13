import { IconCheck, IconKey, IconLockCog, IconMoodAnnoyed, IconMoodLookDown, IconX } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { Link } from "react-router-dom"
import Service from "../../services"
import Button from "../../components/form/Button"
import Input from "../../components/form/Input"
import Window from "../../components/layout/Window"
import StringHelper from "../../helpers/string"
import { validationAuthRegisterForm } from "../../lib/validations/authForms"
import { useAuthorizationSlice } from "../../lib/stores/authorization"
import { useNotificationSlice } from "../../lib/stores/notification"

const criterias = [{
  regex: /.{12,}/,
  message: "At least 12 characters"
}, {
  regex: /[A-Z]/,
  message: "At least one uppercase letter"
}, {
  regex: /[a-z]/,
  message: "At least one lowercase letter"
}, {
  regex: /\d/,
  message: "At least one digit"
}, {
  regex: /[^A-Za-z0-9]/,
  message: "At least one special character"
}]

const WinRegister: FC = () => {
  const setIsAuthorizated = useAuthorizationSlice(state => state.setIsAuthorizated)
  const setAccessToken = useAuthorizationSlice(state => state.setAccessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Window>
    <section className="h-screen items-center justify-center flex flex-col p-4 gap-4">
      <img
        src="/icon.png"
        alt="Passenger"
        width={128}
        height={128}
        draggable="false"
      />

      <h1 className="text-3xl font-bold text-center -my-4">
        Passenger
      </h1>

      <p className="text-center text-tuatara-500">
        Create a safe vault for your passphrases.
      </p>

      <Formik
        initialValues={{
          username: "",
          passphrase: ""
        }}
        validationSchema={validationAuthRegisterForm}
        onSubmit={(values, { setSubmitting }) => {
          /**
           * TODO: This logic is working well,
           * TODO: but for development purposes,
           * TODO: we bypass the keyring and set
           * TODO: the secret key directly.
           *
           * KeyRing
           *   .read(values.username)
           *   .then((key) => localStorage.setItem("SECRET_KEY", key))
           *   .catch(() => {
           *     const key = KeyRing.generate()
           *     KeyRing
           *       .write(values.username, key)
           *       .then(() => localStorage.setItem("SECRET_KEY", key))
           *       .catch(() => console.error("Failed to communicate with keyring.")
           *       )
           *   })
           */
          localStorage.setItem("SECRET_KEY", "A VERY STRONG SECRET KEY")
          Service.register(
            values.username,
            values.passphrase
          ).then((output) => {
            if (output.status !== 0) return addNotification({
              icon: <IconMoodLookDown size={32} />,
              title: "Register failed",
              type: "error",
              message: StringHelper.removeUnixErrorPrefix(output.stderr)
            })
            Service.login(
              values.username,
              values.passphrase
            ).then((response) => {
              if (response.status !== 0) return addNotification({
                icon: <IconMoodLookDown size={32} />,
                title: "Unexpected error",
                type: "error",
                message: StringHelper.removeUnixErrorPrefix(response.stderr)
              })
              setAccessToken(response.stdout)
              setIsAuthorizated(true)
            })
          }).finally(() =>
            setSubmitting(false)
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
          <Form className="flex flex-col gap-4 w-full max-w-md">
            <Input
              type="text"
              name="username"
              label="Username"
              iconLeft={IconMoodAnnoyed}
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

            <p className="text-sm -mb-4">
              Must have criterias:
            </p>

            <ul className="text-sm">
              {criterias.map((criteria, index) =>
                <li
                  key={index}
                  className="flex items-center gap-1"
                >
                  {criteria.regex.test(values.passphrase)
                    ? <IconCheck
                      size={16}
                      color="green" />
                    : <IconX
                      size={16}
                      color="red"
                    />
                  }

                  {criteria.message}
                </li>
              )}
            </ul>

            <Button
              disabled={!isValid}
              rightIcon={<IconLockCog size={24} />}
            >
              Create Vault!
            </Button>

            <Link
              type="button"
              to="/auth/login"
              draggable="false"
              className="text-sm text-center hover:underline"
            >
              I already have a vault, unlock it!
            </Link>
          </Form>
        }
      </Formik>
    </section>
  </Window >
}

export default WinRegister
