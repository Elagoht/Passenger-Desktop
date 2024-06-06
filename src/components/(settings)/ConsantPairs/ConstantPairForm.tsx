import { Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Input from "../../form/Input"
import Button from "../../form/Button"
import { IconDatabaseExclamation, IconDeviceFloppy, IconTrash } from "@tabler/icons-react"
import { validationConstantPairForms } from "../../../lib/validations/constantPairForms"
import { ConstantPair } from "../../../types/common"
import Service from "../../../services"
import Loading from "../../layout/Loading"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import StringHelper from "../../../helpers/string"

const ConstantPairForm: FC = () => {
  const params = useParams<{ key: string }>()

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
    onSubmit={(values) => { values }}
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
          variant="ghost"
          rightIcon={<IconDeviceFloppy size={24} />}
        >
          Save
        </Button>

        <Button
          color="danger"
          variant="ghost"
          className="mt-auto"
          rightIcon={<IconTrash size={24} />}
        >
          Delete
        </Button>
      </Form>
    }
  </Formik>
}

export default ConstantPairForm
