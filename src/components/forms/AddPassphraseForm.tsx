import { IconDeviceFloppy, IconKey, IconLoader, IconNote, IconTag, IconUserCircle, IconWorld } from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import Strength from "@/helpers/strength"
import StringHelper from "@/helpers/string"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import { useNotificationSlice } from "@/lib/stores/notification"
import validationAddPassphraseForm from "@/lib/validations/passphraseForms"
import { createEntry } from "@/services/passphraseServices"
import Button from "@/components/formElements/Button"
import Input from "@/components/formElements/Input"
import PassphraseSuggestion from "@/components/formElements/PassphraseSuggestion"
import TextArea from "@/components/formElements/TextArea"
import Meter from "@/components/Charts/Meter"

export const formFields = {
  platform: IconTag,
  identity: IconUserCircle,
  url: IconWorld,
  passphrase: IconKey
}

const AddPassphraseForm: FC = () => {
  const navigate = useNavigate()
  const accessToken = useAuthorizationSlice(state => state.accessToken)
  const addNotification = useNotificationSlice(state => state.addNotification)

  return <Formik
    initialValues={{
      platform: "",
      identity: "",
      url: "",
      passphrase: "",
      notes: ""
    }}
    validationSchema={validationAddPassphraseForm}
    onSubmit={(values, { setSubmitting }) => {
      createEntry(
        accessToken,
        values
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error",
          title: "Failed to add passphrase",
          message: StringHelper.removeUnixErrorPrefix(response.stderr)
        })
        addNotification({
          type: "success",
          title: "Passphrase added",
          message: "The passphrase was successfully added."
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
            className={classNames({
              "!text-creamcan-500": key === "identity" && values.identity.startsWith("_$"),
            })}
            message={key === "identity" && values.identity.startsWith("_$")
              ? <>Your identity will be connected to a <Link className="underline" to="/settings/constant-pairs">
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
            formNoValidate // Will be handled by Formik and Yup
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
          disabled={isSubmitting}
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            : <IconDeviceFloppy />
          }
        >
          Lock it up!
        </Button>
      </Form>
    )}
  </Formik>
}

export default AddPassphraseForm