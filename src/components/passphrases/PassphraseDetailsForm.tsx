import { IconDeviceFloppy, IconLoader, IconNote } from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formFields } from "../add-passphrase/AddPassphraseForm"
import FormikHelper from "../../helpers/formik"
import Strength from "../../helpers/strength"
import StringHelper from "../../helpers/string"
import { useAuthorizationSlice } from "../../lib/stores/authorization"
import { useNotificationSlice } from "../../lib/stores/notification"
import { ReadWriteDatabaseEntry } from "../../types/common"
import Button from "../form/Button"
import Input from "../form/Input"
import PassphraseSuggestion from "../form/PassphraseSuggestion"
import TextArea from "../form/TextArea"
import Meter from "../statistics/Meter"
import { updateEntry } from "../../services/passphraseServices"

interface IPassphraseDetailsFormProps {
  id: ReadWriteDatabaseEntry["id"]
  platform: ReadWriteDatabaseEntry["platform"]
  identity: ReadWriteDatabaseEntry["identity"]
  url: ReadWriteDatabaseEntry["url"]
  passphrase: ReadWriteDatabaseEntry["passphrase"]
  notes: ReadWriteDatabaseEntry["notes"]
}

const PassphraseDetailsForm: FC<IPassphraseDetailsFormProps> = ({
  id, platform, identity, url, passphrase, notes
}) => {

  const navigate = useNavigate()

  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Formik
    initialValues={{
      platform: platform || "",
      identity: identity || "",
      url: url || "",
      passphrase: passphrase || "",
      notes: notes || ""
    }}
    onSubmit={(values, { setSubmitting }) => {
      updateEntry(
        accessToken,
        id!, // If null, the form already not shown
        values
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error",
          title: "Failed to update passphrase",
          message: StringHelper.removeUnixErrorPrefix(response.stderr)
        })
        addNotification({
          type: "success",
          title: "Passphrase updated",
          message: "The passphrase was successfully updated."
        })
        return navigate("/passphrases")
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
            className={classNames({
              "!text-creamcan-500": key === "identity" && values.identity.startsWith("_$"),
            })}
            message={key === "identity" && values.identity.startsWith("_$")
              ? values.identity === identity
                ? <>Your identity is connected to a <Link className="underline" to="/constant-pairs">
                  constant pair.</Link></>
                : <>Your identity will be connected to a <Link className="underline" to="/constant-pairs">
                  constant pair.</Link></>
              : undefined
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

        <PassphraseSuggestion
          currentPassphrase={values.passphrase}
          setFieldValue={setFieldValue}
        />

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