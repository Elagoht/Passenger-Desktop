import { IconDatabaseExclamation, IconDeviceFloppy } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import StringHelper from "../../../helpers/string"
import { validationConstantPairForms } from "../../../lib/validations/constantPairForms"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { ConstantPair } from "../../../types/common"
import Button from "../../form/Button"
import Input from "../../form/Input"
import Loading from "../../layout/Loading"
import ConstantPairDeleteButton from "./ConstantPairDeleteButton"

const ConstantPairForm: FC = () => {
  const params = useParams<{ key: string }>()
  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  const [constant, setConstant] = useState<ConstantPair>()

  useEffect(() => {
    Service.constants(
      accessToken
    ).then((response) => {
      if (!response.success) return addNotification({
        type: "error",
        message: StringHelper.removeUnixErrorPrefix(response.output),
        icon: <IconDatabaseExclamation />
      })
      setConstant(StringHelper.deserialize<ConstantPair[]>(response.output)?.find(constant => constant.key === params.key))
    })
  }, [])

  if (!constant) return <Loading />

  return <Formik
    initialValues={constant}
    validationSchema={validationConstantPairForms}
    onSubmit={(values, { setSubmitting }) => {
      Service.forget(
        accessToken,
        constant.key
      ).then((response) => {
        if (!response.success) return addNotification({
          type: "error",
          message: StringHelper.removeUnixErrorPrefix(response.output),
          icon: <IconDatabaseExclamation />
        })
        Service.declare(
          accessToken,
          values.key,
          values.value
        ).then((response) => {
          if (!response.success) return addNotification({
            type: "error",
            message: StringHelper.removeUnixErrorPrefix(response.output),
            icon: <IconDatabaseExclamation />
          })

          addNotification({
            type: "success",
            message: "Constant pair updated successfully."
          })

          navigate("/settings/constant-pairs")
        })
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
          rightIcon={<IconDeviceFloppy size={24} />}
        >
          Save
        </Button>

        <ConstantPairDeleteButton constantKey={values.key} />
      </Form>
    }
  </Formik>
}

export default ConstantPairForm
