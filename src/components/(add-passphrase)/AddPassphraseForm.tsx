import { IconDeviceFloppy, IconKey, IconLoader, IconNote, IconTag, IconUserCircle, IconWorld } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Commands from "../../api/cli"
import Strength from "../../helpers/strength"
import StringHelper from "../../helpers/string"
import validationAddPassphraseForm from "../../lib/validations/passphraseForms"
import { useAuthorizationSlice } from "../../stores/authorization"
import { useNotificationSlice } from "../../stores/notification"
import { usePassphrasesSlice } from "../../stores/passphrases"
import Button from "../form/Button"
import Input from "../form/Input"
import TextArea from "../form/TextArea"
import Meter from "../statistics/Meter"

export const formFields = {
  platform: IconTag,
  identity: IconUserCircle,
  url: IconWorld,
  passphrase: IconKey
}

const AddPassphraseForm: FC = () => {
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addPassphrase = usePassphrasesSlice(state => state.addPassphrase)
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
        accessToken,
        values
      ).then((response) => {
        if (response.success) {
          addPassphrase(values) // Update the store
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
      setFieldValue,
      handleBlur,
      isSubmitting
    }) => (
      <Form className="flex flex-col gap-2">
        {Object.keys(formFields).map((key, index) =>
          <Input
            autoFocus={index === 0}
            label={StringHelper.capitalize(key)}
            key={key}
            autoCapitalize="off"
            autoCorrect="off"
            autoSave="off"
            name={key}
            iconLeft={formFields[key as keyof typeof formFields]}
            value={values[key as keyof typeof values]}
            onChange={(event) => {
              key === "platform" && (
                values.url === "" ||
                values.url === `${values.platform.toLowerCase().replace(/\s/g, "")}.com`
              ) && (event.target.value.length === 0
                ? setFieldValue("url", "")
                : setFieldValue("url", `${event.target.value.toLowerCase().replace(/\s/g, "")}.com`)
                )
              handleChange(event)
            }}
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

        <Meter percentage={Strength.calculate(values.passphrase) * 100 / 8} />

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
  </Formik>
}

export default AddPassphraseForm