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

interface IPassphraseDetailsFormProps {
  platform?: Passphrase["platform"]
  identity?: Passphrase["identity"]
  url?: Passphrase["url"]
  passphrase?: Passphrase["passphrase"]
  notes?: Passphrase["notes"]
}

const PassphraseDetailsForm: FC<IPassphraseDetailsFormProps> = ({
  platform, identity, url, passphrase, notes
}) => {

  return <Formik
    initialValues={{
      platform: platform || "",
      identity: identity || "",
      url: url || "",
      passphrase: passphrase || "",
      notes: notes || "",
    }}
    onSubmit={() => { }}
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
      <Form className="grid grid-cols-1 gap-1 relative p-2">
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
            :
            <IconDeviceFloppy />}
        >
          Lock it up!
        </Button>
      </Form>
    }
  </Formik>
}

export default PassphraseDetailsForm