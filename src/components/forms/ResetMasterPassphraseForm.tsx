import Input from "@/components/formElements/Input"
import FormikHelper from "@/helpers/formik"
import { authStore } from "@/lib/stores/authorization"
import { validationResetMasterPassphraseForm } from "@/lib/validations/authForms"
import { resetMasterPassphrase } from "@/services/authServices"
import { IconKey, IconLoader } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../formElements/Button"
import MasterPassphraseChecker from "./AuthForm/MasterPassphraseChecker"
import Toast from "@/helpers/notifications"

const ResetMasterPassphraseForm: FC = () => {
  const navigate = useNavigate()
  const accessToken = authStore((state) => state.accessToken)

  return <Formik
    initialValues={{
      currentPassphrase: "",
      newPassphrase: "",
      confirmPassphrase: ""
    }}
    validationSchema={validationResetMasterPassphraseForm}
    onSubmit={(values, { setSubmitting, setTouched }) =>
      resetMasterPassphrase(
        accessToken,
        values.currentPassphrase,
        values.newPassphrase
      ).then((response) => FormikHelper.handleApiResponse(
        response,
        () => {
          Toast.success({
            title: "Master passphrase updated",
            icon: IconKey
          })
          navigate("/settings")
        },
        "Failed to reset master passphrase",
      )).then(() => setTouched({
        currentPassphrase: true,
        newPassphrase: true,
        confirmPassphrase: true
      })).finally(() =>
        setSubmitting(false)
      )
    }
  >
    {({
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      isSubmitting,
      isValid
    }) =>
      <Form className="flex flex-col gap-4">
        <Input
          type="password"
          name="currentPassphrase"
          label="Current passphrase"
          value={values.currentPassphrase}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.currentPassphrase && errors.currentPassphrase}
          success={touched.currentPassphrase && !errors.currentPassphrase}
        />

        <Input
          type="password"
          name="newPassphrase"
          label="New passphrase"
          value={values.newPassphrase}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newPassphrase && errors.newPassphrase}
          success={touched.newPassphrase && !errors.newPassphrase}
        />

        <Input
          type="password"
          name="confirmPassphrase"
          label="Confirm passphrase"
          value={values.confirmPassphrase}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassphrase && errors.confirmPassphrase}
          success={touched.confirmPassphrase && !errors.confirmPassphrase}
        />

        <MasterPassphraseChecker passphrase={values.newPassphrase} />

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="btn btn-primary"
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            : <IconKey />
          }
        >
          {isSubmitting
            ? "Updating..."
            : "Reset Master Passphrase"
          }
        </Button>
      </Form>
    }
  </Formik>
}

export default ResetMasterPassphraseForm
