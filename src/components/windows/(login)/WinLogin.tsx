import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Commands from "../../../api/cli"
import { useAuthorizationSlice } from "../../../stores/authorization"
import Input from "../../form/Input"
import Window from "../../layout/Window"

const WinLogin: FC = () => {
  const navigate = useNavigate()

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)

  return <Window>
    <section className="h-screen items-center justify-center flex p-4">
      <Formik
        initialValues={{
          passphrase: ""
        }}
        onSubmit={(values) => Commands
          .login(values.passphrase)
          .then((response) => {
            response
            setIsAuthorizated(true)
            navigate("/dashboard")
          })
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) =>
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

            <button className="bg-tuatara-500 text-white rounded-lg p-2 transition-all hover:bg-tuatara-600">
              Login
            </button>
          </Form>
        }
      </Formik>
    </section>
  </Window>
}

export default WinLogin