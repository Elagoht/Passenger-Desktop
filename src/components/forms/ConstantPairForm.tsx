import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import ConstantPairDeleteButton from "@/components/windows/settings/ConsantPairs/ConstantPairDeleteButton"
import FormikHelper from "@/helpers/formik"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
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
  const addNotification = toastStore((state) => state.addToast)

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
      .then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error",
          message: StringHelper.removeUnixErrorPrefix(response.stdout),
          title: `Couldn't ${mode === "declare"
            ? "declare"
            : "modify"
            } at the moment`,
          icon: <IconDatabaseExclamation />
        })
        addNotification({
          type: "success",
          message: `Constant pair is ${mode === "declare"
            ? "ready to use"
            : "modified"
            }`,
          title: `${mode === "declare"
            ? "Declared"
            : "Modified"
            } Constant Pair`,
          icon: <IconDeviceFloppy />
        })
        navigate("/settings/constant-pairs")
      }).finally(() =>
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
