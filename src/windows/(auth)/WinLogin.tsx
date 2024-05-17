import { IconKey, IconMoodBoy, IconMoodEmpty, IconMoodHappy, IconMoodLookDown, IconMoodLookLeft, IconMoodLookRight, IconMoodLookUp, IconMoodSmileBeam, IconMoodTongue, IconMoodTongueWink, IconMoodUnamused, IconMoodWink } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import Commands from "../../api/cli"
import { validationAuthLoginForm } from "../../lib/validations/authForms"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useKeyringSlice } from "../../stores/keyring"
import { useNotificationSlice } from "../../stores/notification"
import Button from "../../components/form/Button"
import Input from "../../components/form/Input"
import Window from "../../components/layout/Window"
import StringHelper from "../../helpers/string"

const moods = [
  <IconMoodSmileBeam size={32} />,
  <IconMoodUnamused size={32} />,
  <IconMoodLookDown size={32} />,
  <IconMoodBoy size={32} />,
  <IconMoodLookUp size={32} />,
  <IconMoodLookLeft size={32} />,
  <IconMoodLookRight size={32} />,
  <IconMoodWink size={32} />,
  <IconMoodTongue size={32} />,
  <IconMoodTongueWink size={32} />,
  <IconMoodEmpty size={32} />,
  <IconMoodHappy size={32} />
]

const WinLogin: FC = () => {
  const navigate = useNavigate()

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)
  const secretKey = useKeyringSlice((state) => state.secretKey)
  const setSecretKey = useKeyringSlice((state) => state.setSecretKey)
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
           *   .then((key) => setSecretKey(key))
           *   .catch(() => {
           *     const key = KeyRing.generate()
           *     KeyRing
           *       .write(values.username, key)
           *       .then(() => setSecretKey(key))
           *       .catch(() => console.error("Failed to communicate with keyring.")
           *       )
           *   })
           */
          setSecretKey("6%+aR5zG7w!3u9@3_2#8^5&4*7(1@&)0")
          Commands
            .login(values.passphrase)
            .then((output) => {
              // TODO: Implement a UI feedback for failed login.
              if (!output.success) return addNotification({
                icon: <IconMoodLookDown size={32} />,
                title: "Login failed",
                type: "error",
                message: StringHelper.removeUnixErrorPrefix(output.output)
              })
              setIsAuthorizated(true)
              navigate("/dashboard")
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
              iconLeft={<IconKey size={32} />}
              value={values.passphrase}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.passphrase && errors.passphrase}
              success={touched.passphrase && !errors.passphrase}
            />

            <Button disabled={!isValid}>
              Login
            </Button>
          </Form>
        }
      </Formik>
    </section>
  </Window >
}

export default WinLogin