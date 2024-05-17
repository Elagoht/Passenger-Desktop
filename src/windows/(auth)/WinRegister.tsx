import { IconCheck, IconX, IconKey, IconLockCog, IconMoodAnnoyed, IconMoodLookDown } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { Link } from "react-router-dom"
import Commands from "../../api/cli"
import Button from "../../components/form/Button"
import Input from "../../components/form/Input"
import Window from "../../components/layout/Window"
import StringHelper from "../../helpers/string"
import { validationAuthRegisterForm } from "../../lib/validations/authForms"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useKeyringSlice } from "../../stores/keyring"
import { useNotificationSlice } from "../../stores/notification"

const WinRegister: FC = () => {
  const setSecretKey = useKeyringSlice(state => state.setSecretKey)
  const setIsAuthorizated = useAuthorizationSlice(state => state.setIsAuthorizated)
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
            .register(
              /**
               * TODO: add username field to CLI
               * values.username,
               */
              values.passphrase
            )
            .then((output) => {
              // TODO: Implement a UI feedback for failed login.
              if (!output.success) return addNotification({
                icon: <IconMoodLookDown size={32} />,
                title: "Login failed",
                type: "error",
                message: StringHelper.removeUnixErrorPrefix(output.output)
              })
              setIsAuthorizated(true)
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
              iconLeft={<IconMoodAnnoyed size={32} />}
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

            <p className="text-sm -mb-4">
              Must have criterias:
            </p>

            <ul className="text-sm">
              {/* <li className="flex items-center gap-1">
                {/.{12,}/.test(values.passphrase)
                  ? <IconCheck size={16} color="green" />
                  : <IconX size={16} color="red" />
                }
                At least 12 characters
              </li>
              <li className="flex items-center gap-1">
                {/[A-Z]/.test(values.passphrase)
                  ? <IconCheck size={16} color="green" />
                  : <IconX size={16} color="red" />
                }
                At least one uppercase letter
              </li>
              <li className="flex items-center gap-1">
                {/[a-z]/.test(values.passphrase)
                  ? <IconCheck size={16} color="green" />
                  : <IconX size={16} color="red" />
                }
                At least one lowercase letter
              </li>
              <li className="flex items-center gap-1">
                {/\d/.test(values.passphrase)
                  ? <IconCheck size={16} color="green" />
                  : <IconX size={16} color="red" />
                }
                At least one digit
              </li>
              <li className="flex items-center gap-1">
                {/[^A-Za-z0-9]/.test(values.passphrase)
                  ? <IconCheck size={16} color="green" />
                  : <IconX size={16} color="red" />
                }
                At least one special character
              </li> */}
              {[{
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
              }].map((criteria, index) =>
                <li
                  key={index}
                  className="flex items-center gap-1"
                >
                  {criteria.regex.test(values.passphrase)
                    ? <IconCheck size={16} color="green" />
                    : <IconX size={16} color="red" />
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
              className="text-sm text-center hover:underline"
            >
              I already have a vault, login!
            </Link>
          </Form>
        }
      </Formik>
    </section>
  </Window >
}

export default WinRegister
