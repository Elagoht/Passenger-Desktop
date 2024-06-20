import { IconBrandChrome, IconBrandFirefox, IconBrandSafari, IconFileImport, IconLoader, IconSelector } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { FC } from "react"
import FileInput from "../../form/FileInput"
import Select from "../../form/Select"
import { validationImportFromBrowserForm } from "../../../lib/validations/importExportForms"
import Button from "../../form/Button"
import Service from "../../../services"
import { useAuthorizationSlice } from "../../../stores/authorization"
import { useNotificationSlice } from "../../../stores/notification"
import { useNavigate } from "react-router-dom"
import StringHelper from "../../../helpers/string"
import { usePassphrasesSlice } from "../../../stores/passphrases"
import { DatabaseEntry } from "../../../types/common"

const browserIcons = {
  "": IconSelector,
  chromium: IconBrandChrome,
  firefox: IconBrandFirefox,
  safari: IconBrandSafari
}

const ImportFromBrowserForm: FC = () => {
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)
  const loadPassphrases = usePassphrasesSlice((state) => state.loadPassphrases)

  const navigate = useNavigate()

  return <Formik
    initialValues={{
      browser: "",
      file: null
    } as {
      browser: string,
      file: File | null
    }}
    validationSchema={validationImportFromBrowserForm}
    onSubmit={async (values, { setSubmitting }) => {
      Service.import( // Import passwords from the browser
        accessToken,
        values.browser,
        await values.file!.text()
      ).then((response) => {
        if (!response.success) return addNotification({
          type: "error", // If unsuccessful, show an error notification
          message: StringHelper.removeUnixErrorPrefix(response.output)
        })
        addNotification({ // If successful, show a success notification
          type: "success",
          message: StringHelper.removeUnixErrorPrefix(response.output)
        })
        Service.fetchAll( // Fetch all passphrases
          accessToken
        ).then((response) => {
          if (!response.success) return addNotification({
            type: "error", // If unsuccessful, show an error notification
            message: StringHelper.removeUnixErrorPrefix(response.output)
          })
          loadPassphrases(StringHelper.deserialize<DatabaseEntry[]>(
            response.output // If successful, load the new passphrases
          ))
        }).finally( // Navigate to the passphrases page
          () => navigate("/passphrases")
        )
      }).finally( // Fallback for any error
        () => setSubmitting(false)
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
      isSubmitting,
      isValid
    }) =>
      <Form className="flex flex-col gap-4">
        <Select
          label="Browser Type"
          name="browser"
          iconLeft={browserIcons[values.browser as keyof typeof browserIcons]}
          value={values.browser}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.browser && errors.browser}
          success={!errors.browser && touched.browser}
          disabled={isSubmitting}
          message="Chromium covers Chrome, Edge, Brave, Edge, Vivaldi etc."
        >
          <option value="chromium">Chromium</option>
          <option value="firefox">Firefox</option>
          <option value="safari">Safari</option>
        </Select>

        <FileInput
          label="CSV File"
          name="file"
          size={10485760} // 10MB max size
          accept="text/csv"
          iconLeft={IconFileImport}
          onChange={(event) => setFieldValue("file", event.currentTarget.files![0])}
          onBlur={handleBlur}
          error={values.file && errors.file}
          success={values.file && !errors.file}
        />

        <Button
          type="submit"
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            : <IconFileImport />
          }
          disabled={isSubmitting || !isValid}
        >
          Secure Passwords
        </Button>
      </Form>
    }
  </Formik>
}

export default ImportFromBrowserForm
