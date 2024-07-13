import { IconKey, IconLockOpen, IconMoodBoy, IconMoodEmpty, IconMoodHappy, IconMoodLookDown, IconMoodLookLeft, IconMoodLookRight, IconMoodLookUp, IconMoodSmileBeam, IconMoodTongue, IconMoodTongueWink, IconMoodUnamused, IconMoodWink } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/form/Button"
import Input from "../../components/form/Input"
import Window from "../../components/layout/Window"
import StringHelper from "../../helpers/string"
import { useAuthorizationSlice } from "../../lib/stores/authorization"
import { useNotificationSlice } from "../../lib/stores/notification"
import { validationAuthLoginForm } from "../../lib/validations/authForms"
import { loginToPassenger } from "../../services/authServices"

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
  IconMoodHappy,
]

const WinLogin: FC = () => {
  const navigate = useNavigate()

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)
  const setAccessToken = useAuthorizationSlice((state) => state.setAccessToken)
  const setDoesRequireReAuth = useAuthorizationSlice((state) => state.setDoesRequireReAuth)
  const addNotification = useNotificationSlice((state) => state.addNotification)
  const [mood, setMood] = useState<number>(Math.floor(Math.random() * moods.length))

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
        Access your vault with your passphrase.
      </p>

      <Formik
        initialValues={{
          username: "",
          passphrase: ""
        }}
        validationSchema={validationAuthLoginForm}
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
          loginToPassenger(
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

            <Button
              rightIcon={<IconLockOpen size={24} />}
              disabled={!isValid}
            >
              Unlock Vault
            </Button>

            <Link
              to="/auth/register"
              draggable="false"
              className="text-sm text-center hover:underline"
            >
              Not have a vault yet? Create one!
            </Link>
          </Form>
        }
      </Formik>
    </section>
  </Window>
}

export default WinLogin