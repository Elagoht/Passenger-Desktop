import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import ConstantPairDeleteButton from "@/components/windows/settings/ConsantPairs/ConstantPairDeleteButton"
import FormikHelper from "@/helpers/formik"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { validationConstantPairForms } from "@/lib/validations/constantPairForms"
import { declareConstantPair, modifyConstantPair } from "@/services/constantPairServices"
import { ConstantPair } from "@/types/common"
import { IconDatabaseExclamation, IconDeviceFloppy } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

type IConstantPairFormProps = {
  mode: "declare"
  existing?: undefined
} | {
  mode: "modify"
  existing: ConstantPair
}

const ConstantPairForm: FC<IConstantPairFormProps> = ({ mode, existing }) => {
  const navigate = useNavigate()

  const accessToken = authStore((state) => state.accessToken)

  const formAction = (values: Record<string, string>) =>
    mode === "declare"
      ? declareConstantPair(accessToken, values.key, values.value)
      : modifyConstantPair(accessToken, existing.key, values.key, values.value)

  return <Formik
    initialValues={
      mode === "declare"
        ? { key: "", value: "" }
        : { key: existing.key, value: existing.value }
    }
    validationSchema={validationConstantPairForms}
    onSubmit={(values, { setSubmitting }) => formAction(values)
      .then((response) =>
        handleResponse(
          response,
          [() => navigate("/settings/constant-pairs"), {
            successTitle: `${mode === "declare" ? "Declared" : "Modified"} Constant Pair`,
            successMessage: `Constant pair is ${mode === "declare" ? "ready to use" : "modified"}`,
            successIcon: IconDeviceFloppy
          }],
          [() => void 0, {
            errorTitle: `Couldn't ${mode === "declare" ? "declare" : "modify"} at the moment`,
            errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr),
            errorIcon: IconDatabaseExclamation
          }]
        )
      ).finally(() =>
        setSubmitting(false)
      )
    }
  >
    {({
      values,
      touched,
      errors,
      handleChange,
      handleBlur
    }) =>
      <Form className="flex flex-col gap-4 h-full">
        <Input
          label="Key"
          name="key"
          value={values.key}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.key && errors.key}
        />

        <Input
          label="Value"
          name="value"
          value={values.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.value && errors.value}
        />

        <Button
          color="success"
          disabled={mode === "modify" && !FormikHelper.isEdited(values, existing)}
          rightIcon={<IconDeviceFloppy size={24} />}
        >
          {mode === "declare"
            ? "Declare"
            : "Modify"
          }
        </Button>

        <ConstantPairDeleteButton constantKey={values.key} />
      </Form>
    }
  </Formik >
}

export default ConstantPairForm
