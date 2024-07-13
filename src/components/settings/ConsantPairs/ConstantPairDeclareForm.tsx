import { IconDatabaseExclamation, IconDeviceFloppy } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import StringHelper from "../../../helpers/string"
import { validationConstantPairForms } from "../../../lib/validations/constantPairForms"
import Service from "../../../services/generationServices"
import { useAuthorizationSlice } from "../../../lib/stores/authorization"
import { useNotificationSlice } from "../../../lib/stores/notification"
import Button from "../../form/Button"
import Input from "../../form/Input"
import ConstantPairDeleteButton from "./ConstantPairDeleteButton"

const ConstantPairDeclareForm: FC = () => {
  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  return <Formik
    initialValues={{
      key: "",
      value: ""
    }}
    validationSchema={validationConstantPairForms}
    onSubmit={(values, { setSubmitting }) => {
      Service.declare(
        accessToken,
        values.key,
        values.value
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error",
          message: StringHelper.removeUnixErrorPrefix(response.stderr),
          title: "Couldn't declare 🥹",
          icon: <IconDatabaseExclamation />
        })
        addNotification({
          type: "success",
          message: "Constant pair is ready to use",
          title: "Declared Constant Pair",
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
          rightIcon={<IconDeviceFloppy size={24} />}
        >
          Save
        </Button>

        <ConstantPairDeleteButton constantKey={values.key} />
      </Form>
    }
  </Formik>
}

export default ConstantPairDeclareForm