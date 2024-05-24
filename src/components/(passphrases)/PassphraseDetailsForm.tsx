import { IconDeviceFloppy, IconLoader, IconNote } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import { formFields } from "../(add-passphrase)/AddPassphraseForm"
import FormikHelper from "../../helpers/formik"
import Strength from "../../helpers/strength"
import StringHelper from "../../helpers/string"
import Button from "../form/Button"
import Input from "../form/Input"
import TextArea from "../form/TextArea"
import Meter from "../statistics/Meter"
import { Passphrase } from "../../types/common"
import Commands from "../../api/cli"
import { useAuthorizationSlice } from "../../stores/authorization"
import { usePassphrasesSlice } from "../../stores/passphrases"
import { useNotificationSlice } from "../../stores/notification"
import { useNavigate } from "react-router-dom"

interface IPassphraseDetailsFormProps {
  id: Passphrase["id"]
  platform: Passphrase["platform"]
  identity: Passphrase["identity"]
  url: Passphrase["url"]
  passphrase: Passphrase["passphrase"]
  notes: Passphrase["notes"]
}

const PassphraseDetailsForm: FC<IPassphraseDetailsFormProps> = ({
  id, platform, identity, url, passphrase, notes
}) => {

  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const updatePassphrase = usePassphrasesSlice(state => state.updatePassphrase)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Formik
    initialValues={{
      platform: platform || "",
      identity: identity || "",
      url: url || "",
      passphrase: passphrase || "",
      notes: notes || "",
    }}
    onSubmit={(values, { setSubmitting }) => {
      Commands.update(
        accessToken,
        id!, // If null, the form already not shown
        values
      ).then((response) => {
        if (response.success) {
          updatePassphrase(id, values)
          addNotification({
            type: "success",
            title: "Passphrase updated",
            message: "The passphrase was successfully updated."
          })
          return navigate("/passphrases")
        }
        addNotification({
          type: "error",
          title: "Failed to update passphrase",
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
      initialValues,
      isSubmitting
    }) =>
      <Form className="grid grid-cols-1 gap-1 relative">
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
          disabled={isSubmitting || !FormikHelper.isEdited(initialValues, values)}
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            : <IconDeviceFloppy />
          }
        >
          Lock it up!
        </Button>
      </Form>
    }
  </Formik>
}

export default PassphraseDetailsForm