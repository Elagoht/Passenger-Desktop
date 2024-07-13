import { IconCheck, IconKey, IconLockOpen, IconMoodBoy, IconMoodEmpty, IconMoodHappy, IconMoodLookDown, IconMoodLookLeft, IconMoodLookRight, IconMoodLookUp, IconMoodSmileBeam, IconMoodTongue, IconMoodTongueWink, IconMoodUnamused, IconMoodWink, IconX } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { validationAuthLoginForm, validationAuthRegisterForm } from "../../lib/validations/authForms"
import { useNavigate } from "react-router-dom"
import { useAuthorizationSlice } from "../../lib/stores/authorization"
import { useNotificationSlice } from "../../lib/stores/notification"
import StringHelper from "../../helpers/string"
import { loginToPassenger, registerToPassenger } from "../../services/authServices"
import Input from "../form/Input"
import Button from "../form/Button"
import { Link } from "react-router-dom"

interface IAuthFormProps {
  mode: "login" | "register"
}

const AuthForm: FC<IAuthFormProps> = ({ mode }) => {
  const navigate = useNavigate()

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)
  const setAccessToken = useAuthorizationSlice((state) => state.setAccessToken)
  const setDoesRequireReAuth = useAuthorizationSlice((state) => state.setDoesRequireReAuth)
  const addNotification = useNotificationSlice((state) => state.addNotification)
  const [mood, setMood] = useState<number>(Math.floor(Math.random() * moods.length))

  return <section className="h-screen items-center justify-center flex flex-col p-4 gap-4">
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
      {mode === "login" && "Access your vault with your passphrase."}
      {mode === "register" && "Create a safe vault for your passphrases."}
    </p>

    <Formik
      initialValues={{
        username: "",
        passphrase: ""
      }}
      validationSchema={validationSchemas[mode]}
      onSubmit={async (values, { setSubmitting }) => {
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

        let continueToLogin = true
        if (mode === "register")
          await registerToPassenger(
            values.username,
            values.passphrase
          ).then((output) => {
            if (output.status === 0) return addNotification({
              icon: <IconMoodSmileBeam size={32} />,
              title: "Register successful",
              type: "success",
              message: "Your vault has been created successfully."
            })
            addNotification({
              icon: <IconMoodLookDown size={32} />,
              title: "Register failed",
              type: "error",
              message: StringHelper.removeUnixErrorPrefix(output.stderr)
            })
            continueToLogin = false
          })
        if (!continueToLogin) return

        await loginToPassenger(
          values.username,
          values.passphrase
        ).then((response) => {
          if (response.status !== 0) return addNotification({
            icon: <IconMoodLookDown size={32} />,
            title: "Could't open the vault",
            type: "error",
            message: StringHelper.removeUnixErrorPrefix(response.stderr)
          })

          const { stdout: jwt } = response // Extract the JWT from the response.
          setAccessToken(jwt)

          // Start a 10 minutes interval to show re-authentication modal.
          window.setInterval(
            () => setDoesRequireReAuth(true),
            60 * 10 * 1000 // This is the expiration time of the JWT.
          )
          navigate("/dashboard")
          setIsAuthorizated(true)
        }).then(() =>
          setMood(Math.floor(Math.random() * moods.length))
        ).finally(() =>
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
            iconLeft={moods[mood]}
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

          {mode === "register" && <>
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
          </>}

          <Button
            rightIcon={<IconLockOpen size={24} />}
            disabled={!isValid}
          >
            {`${mode === "login"
              ? "Unlock"
              : "Create"
              } vault`
            }
          </Button>

          {mode === "login" &&
            <Link
              to="/auth/register"
              draggable="false"
              className="text-sm text-center hover:underline"
            >
              Not have a vault yet? Create one!
            </Link>
          }

          {mode === "register" &&
            <Link
              type="button"
              to="/auth/login"
              draggable="false"
              className="text-sm text-center hover:underline"
            >
              I already have a vault, unlock it!
            </Link>
          }
        </Form>
      }
    </Formik>
  </section>
}

const moods = [
  IconMoodSmileBeam,
  IconMoodUnamused,
  IconMoodLookDown,
  IconMoodBoy,
  IconMoodLookUp,
  IconMoodLookLeft,
  IconMoodLookRight,
  IconMoodWink,
  IconMoodTongue,
  IconMoodTongueWink,
  IconMoodEmpty,
  IconMoodHappy
]

const validationSchemas: Record<IAuthFormProps["mode"], unknown> = {
  login: validationAuthLoginForm,
  register: validationAuthRegisterForm
}

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

export default AuthForm

