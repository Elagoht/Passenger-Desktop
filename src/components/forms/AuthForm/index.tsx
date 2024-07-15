import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import Cookie from "@/helpers/cookies"
import handleResponse from "@/helpers/services"
import { authStore } from "@/lib/stores/authorization"
import { validationAuthLoginForm, validationAuthRegisterForm } from "@/lib/validations/authForms"
import { loginToPassenger, registerToPassenger } from "@/services/authServices"
import { IconKey, IconLockOpen, IconMoodBoy, IconMoodEmpty, IconMoodHappy, IconMoodLookDown, IconMoodLookLeft, IconMoodLookRight, IconMoodLookUp, IconMoodSmileBeam, IconMoodTongue, IconMoodTongueWink, IconMoodUnamused, IconMoodWink } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MasterPassphraseChecker from "./MasterPassphraseChecker"

interface IAuthFormProps {
  mode: "login" | "register"
}

const AuthForm: FC<IAuthFormProps> = ({ mode }) => {
  const navigate = useNavigate()

  const { logInUser } = authStore()

  const [mood, setMood] = useState<number>(Math.floor(Math.random() * moods.length))

  return <section className="flex flex-col gap-4 p-4 items-center">
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
        if (mode === "register") handleResponse(
          await registerToPassenger(
            values.username,
            values.passphrase
          ),
          [() => { continueToLogin = true }
            , {
            successTitle: "Register successful",
            successMessage: "Your vault has been created successfully.",
            successIcon: IconMoodSmileBeam
          }],
          [() => void 0, {
            errorTitle: "Register failed",
            errorIcon: IconMoodLookDown
          }]
        )
        if (!continueToLogin) return

        await loginToPassenger(
          values.username,
          values.passphrase
        ).then((response) => handleResponse(
          response,
          [() => {
            Cookie.set("accessToken", response.stdout)
            logInUser()
            navigate("/dashboard")
          }, {
            successTitle: "Access granted!",
            successMessage: "Welcome back to your vault.",
            successIcon: IconMoodHappy
          }],
          [() => void 0, {
            errorTitle: "Access denied",
            errorIcon: IconMoodLookDown
          }]
        )).then(() =>
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

          {mode === "register" && <MasterPassphraseChecker passphrase={values.passphrase} />}

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

export default AuthForm

