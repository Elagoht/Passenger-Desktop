import Meter from "@/components/charts/Meter"
import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import PassphraseSuggestion from "@/components/formElements/PassphraseSuggestion"
import TextArea from "@/components/formElements/TextArea"
import FormikHelper from "@/helpers/formik"
import Strength from "@/helpers/strength"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { toastStore } from "@/lib/stores/notification"
import { createEntry, updateEntry } from "@/services/passphraseServices"
import { ReadWriteDatabaseEntry } from "@/types/common"
import { IconDeviceFloppy, IconKey, IconLoader, IconNote, IconTag, IconUserCircle, IconWorld } from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"

type IPassphraseDetailsFormProps = {
  mode: "edit"
  existing: ReadWriteDatabaseEntry
} | {
  mode: "new"
  existing?: undefined
}

const PassphraseEntryForm: FC<IPassphraseDetailsFormProps> = ({ mode, existing }) => {
  const navigate = useNavigate()
  const accessToken = authStore(state => state.accessToken)
  const addNotification = toastStore(state => state.addToast)

  const formAction = (values: Record<string, string>) =>
    mode === "edit"
      ? updateEntry(accessToken, existing.id, values)
      : createEntry(accessToken, values)

  const { platform, identity, url, passphrase, notes } = existing || {}

  return <Formik
    initialValues={{
      platform: platform || "",
      identity: identity || "",
      url: url || "",
      passphrase: passphrase || "",
      notes: notes || ""
    }}
    onSubmit={(values, { setSubmitting }) => {
      formAction(values)
        .then((response) => {
          if (response.status !== 0) return addNotification({
            type: "error",
            title: `Failed to ${mode === "edit"
              ? "update"
              : "add"
              } passphrase`,
            message: StringHelper.removeUnixErrorPrefix(response.stderr)
          })
          addNotification({
            type: "success",
            title: `Passphrase ${mode === "edit"
              ? "updated"
              : "added"
              }!`,
            message: `The passphrase was successfully ${mode === "edit"
              ? "updated"
              : "added"
              }.`
          })
          navigate("/passphrases")
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
            formNoValidate // Dynamic validation will be handled by Formik
          />
        )}

        <Meter percentage={Strength.calculate(values.passphrase) * 100 / 8} />

        <PassphraseSuggestion
          currentPassphrase={values.passphrase}
          setFieldValue={setFieldValue}
        />

        <TextArea
          label="Notes"
          iconLeft={IconNote}
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
  </Formik >
}

const formFields = {
  platform: IconTag,
  identity: IconUserCircle,
  url: IconWorld,
  passphrase: IconKey
}

export default PassphraseEntryForm
