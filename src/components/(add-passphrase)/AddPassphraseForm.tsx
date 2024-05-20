import { IconDeviceFloppy, IconKey, IconLoader, IconMail, IconNote, IconTag, IconUserCircle, IconWorld } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import StringHelper from "../../helpers/string"
import Button from "../form/Button"
import Input from "../form/Input"
import TextArea from "../form/TextArea"

const fields = {
  platform: {
    icon: IconTag,
    type: "text"
  },
  username: {
    icon: IconUserCircle,
    type: "text"
  },
  email: {
    icon: IconMail,
    type: "email"
  },
  url: {
    icon: IconWorld,
    type: "url"
  },
  passphrase: {
    icon: IconKey,
    type: "password"
  }
}

const AddPassphraseForm: FC = () => {
  return <Formik
    initialValues={{
      platform: "",
      username: "",
      email: "",
      url: "",
      passphrase: "",
      notes: "",
    }}
    onSubmit={(values) => values && void 1}
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
            iconLeft={fields[key as keyof typeof fields].icon}
            value={values[key as keyof typeof values]}
            onChange={handleChange}
            onBlur={handleBlur}
            type={fields[key as keyof typeof fields].type as "text" | "email" | "url" | "password"}
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
  </Formik>
}

export default AddPassphraseForm