import { IconDatabaseExclamation, IconDeviceFloppy } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormikHelper from "@/helpers/formik"
import StringHelper from "@/helpers/string"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import { useNotificationSlice } from "@/lib/stores/notification"
import { validationConstantPairForms } from "@/lib/validations/constantPairForms"
import { modifyConstantPair, rememberConstantPair } from "@/services/constantPairServices"
import { ConstantPair } from "@/types/common"
import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import Loading from "@/components/layout/Loading"
import ConstantPairDeleteButton from "@/components/windows/settings/ConsantPairs/ConstantPairDeleteButton"

const ConstantPairForm: FC = () => {
  const params = useParams<{ key: string }>()
  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constant, setConstant] = useState<ConstantPair>()

  useEffect(() => {
    rememberConstantPair(
      accessToken,
      params.key!
    ).then((response) => {
      if (response.status !== 0) return addNotification({
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.stderr),
        icon: <IconDatabaseExclamation />
      })
      setConstant(StringHelper.deserialize<ConstantPair>(response.stdout))
    })
  }, [])

  if (!constant) return <Loading />

  return <Formik
    initialValues={constant}
    validationSchema={validationConstantPairForms}
    onSubmit={(values, { setSubmitting }) => {
      modifyConstantPair(
        accessToken,
        params.key!,
        values.key,
        values.value
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error",
          message: StringHelper.removeUnixErrorPrefix(response.stdout),
          title: "Couldn't modify at the moment",
          icon: <IconDatabaseExclamation />
        })
        addNotification({
          type: "success",
          message: "Constant pair modified successfully",
          title: "Modified Constant Pair",
          icon: <IconDeviceFloppy />
        })
        navigate("/settings/constant-pairs")
      }).finally(() =>
        setSubmitting(false)
      )
    }}
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
          disabled={!FormikHelper.isEdited(values, constant)}
          rightIcon={<IconDeviceFloppy size={24} />}
        >
          Modify
        </Button>

        <ConstantPairDeleteButton constantKey={values.key} />
      </Form>
    }
  </Formik>
}

export default ConstantPairForm
