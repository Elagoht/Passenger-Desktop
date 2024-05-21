import { IconDeviceFloppy, IconKey, IconLoader, IconNote, IconTag, IconUserCircle, IconWorld } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Commands from "../../api/cli"
import StringHelper from "../../helpers/string"
import validationAddPassphraseForm from "../../lib/validations/passphraseForms"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import Button from "../form/Button"
import Input from "../form/Input"
import TextArea from "../form/TextArea"
import { Passphrase } from "../../types/common"

const fields = {
  platform: IconTag,
  identity: IconUserCircle,
  url: IconWorld,
  passphrase: IconKey
}

const AddPassphraseForm: FC = () => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)
  const navigate = useNavigate()

  return <Formik
    initialValues={{
      platform: "",
      identity: "",
      url: "",
      passphrase: "",
      notes: "",
    }}
    validationSchema={validationAddPassphraseForm}
    onSubmit={(values, { setSubmitting }) => {
      Commands.create(
        accessToken, {
          platform: values.platform,
          email: values.identity, // CLI expects email, not identity
          url: values.url,
          passphrase: values.passphrase,
          notes: values.notes
        } as unknown as Passphrase // Temporary workaround until the CLI is updated
      ).then((response) => {
        if (response.success) {
          addNotification({
            type: "success",
            title: "Passphrase added",
            message: "The passphrase was successfully added."
          })
          return navigate("/passphrases")
        }
        addNotification({
          type: "error",
          title: "Failed to add passphrase",
          message: StringHelper.removeUnixErrorPrefix(response.output)
        })
      }).finally(() =>
        setSubmitting(false)
      )
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting
    }) => (
      <Form className="flex flex-col gap-2">
        {Object.keys(fields).map((key, index) =>
          <Input
            autoFocus={index === 0}
            label={StringHelper.capitalize(key)}
            key={key}
            autoCapitalize="off"
            autoCorrect="off"
            autoSave="off"
            name={key}
            iconLeft={fields[key as keyof typeof fields]}
            value={values[key as keyof typeof values]}
            onChange={handleChange}
            onBlur={handleBlur}
            type={key === "passphrase"
              ? "password"
              : "text"
            }
            error={touched[key as keyof typeof errors]
              ? errors[key as keyof typeof errors]
              : false
            }
            success={touched[key as keyof typeof errors]
              ? !errors[key as keyof typeof errors]
              : false
            }
            formNoValidate // Will be handled by Formik
          />
        )}

        <TextArea
          label="Notes"
          iconLeft={<IconNote />}
          name="notes"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.notes
            ? errors.notes
            : false
          }
          success={touched.notes
            ? !errors.notes
            : false
          }
        />

        <Button
          disabled={isSubmitting}
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            :
            <IconDeviceFloppy />}
        >
          Lock it up!
        </Button>
      </Form>
    )}
  </Formik >
}

export default AddPassphraseForm