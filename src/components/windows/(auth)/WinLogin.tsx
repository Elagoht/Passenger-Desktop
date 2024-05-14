import { IconKey } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Commands from "../../../api/cli"
import { validationAuthLoginForm } from "../../../lib/validations/authForms"
import { useAuthorizationSlice } from "../../../stores/authorization"
import Button from "../../form/Button"
import Input from "../../form/Input"
import Window from "../../layout/Window"

const WinLogin: FC = () => {
  const navigate = useNavigate()

  const setIsAuthorizated = useAuthorizationSlice((state) => state.setIsAuthorizated)

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
        Take your keys in your bag.
      </p>

      <Formik
        initialValues={{
          passphrase: ""
        }}
        validationSchema={validationAuthLoginForm}
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
          isValid
        }) =>
          <Form className="flex flex-col gap-4 w-full max-w-md">
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

            <Button
              disabled={!isValid}
            >
              Login
            </Button>
          </Form>
        }
      </Formik>
    </section>
  </Window>
}

export default WinLogin