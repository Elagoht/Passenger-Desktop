import { Form, Formik } from "formik"
import { FC, useState } from "react"
import Commands from "../api/cli"
import Input from "../components/form/Input"
import { useAuthorizationSlice } from "../stores/authorization"

const LoginForm: FC = () => {
  const [text, setText] = useState<string>("")

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)

  return <main className="h-screen items-center justify-center flex p-4 ">
    <Formik
      initialValues={{
        passphrase: ""
      }}
      onSubmit={(values) =>
        Commands.login(values.passphrase).then((response) => {
          setText(JSON.stringify(response))
          setIsAuthorizated(true)
        })
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) => (
        <Form className="flex flex-col gap-4 w-full max-w-md">
          <Input
            type="password"
            name="passphrase"
            label="Passphrase"
            value={values.passphrase}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passphrase ? errors.passphrase : ""}
            success={touched.passphrase && !errors.passphrase ? "" : undefined}
          />

          <p>{text}</p>

          <button className="bg-tuatara-500 text-white rounded-lg p-2 transition-all hover:bg-tuatara-600">
            Login
          </button>
        </Form>
      )}
    </Formik>
  </main>
}

export default LoginForm