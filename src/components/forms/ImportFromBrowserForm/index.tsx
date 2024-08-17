import Button from "@/components/formElements/Button"
import FileInput from "@/components/formElements/FileInput"
import Select from "@/components/formElements/Select"
import Toast from "@/helpers/notifications"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { useAuth } from "@/hooks/authorization"
import { validationImportFromBrowserForm } from "@/lib/validations/importExportForms"
import { importFromBrowser } from "@/services/dataTransferServices"
import { IconBrandChrome, IconBrandFirefox, IconBrandSafari, IconFileImport, IconLoader, IconSelector } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import Papa from "papaparse"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditImportDataModal from "./EditImportDataModal"

const browserIcons = {
  "": IconSelector,
  chromium: IconBrandChrome,
  firefox: IconBrandFirefox,
  safari: IconBrandSafari
}

const ImportFromBrowserForm: FC = () => {
  const navigate = useNavigate()

  const [editModal, setEditModal] = useState<boolean>(false)
  const [acceptableEntries, setAcceptableEntries] = useState<CSVLineEntry[]>([])
  const [badEntries, setBadEntries] = useState<CSVLineEntry[]>([])

  // Loop until the import is successful
  const tryToImport = (response: Awaited<Promise<Output>>) => handleResponse(
    response,
    [() => navigate("/passphrases"), {
      successTitle: "Success",
      successMessage: response.stdout
    }],
    [() => {
      if (
        response.stderr.startsWith("passenger:")
      ) return Toast.error({
        title: "Could not import",
        message: StringHelper.removeUnixErrorPrefix(response.stderr)
      })
      /**
       * If unsuccessful but file has an acceptable format,
       * core CLI will not accept even the acceptable entries
       * and will return the bad entries on the stderr and
       * acceptable entries on the stdout. We will show the
       * bad entries to the user and ask them to edit the
       * entries.
       */
      const badEntries = Papa.parse<CSVLineEntry>(
        response.stderr,
        { skipEmptyLines: true }
      ).data
      badEntries.shift() // Remove first description
      badEntries.pop() // Remove second description
      setBadEntries(badEntries)
      setAcceptableEntries(Papa.parse<CSVLineEntry>(
        response.stdout,
        { skipEmptyLines: true }
      ).data)
      setEditModal(true)
    }]
  )

  return <Formik
    initialValues={{
      browser: "",
      file: null
    } as {
      browser: string,
      file: Maybe<File>
    }}
    validationSchema={validationImportFromBrowserForm}
    onSubmit={async (values, { setSubmitting }) =>
      importFromBrowser( // Import passwords from the browser
        useAuth(),
        values.browser,
        await values.file!.text()
      ).then(tryToImport
      ).finally(() =>
        setSubmitting(false)
      )
    }
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
          message="Chromium covers Chrome, Edge, Brave, Opera, Vivaldi etc."
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

        <EditImportDataModal
          acceptableCount={acceptableEntries.length}
          badEntries={badEntries}
          setBadEntries={setBadEntries}
          isOpen={editModal}
          closeModal={() => setEditModal(false)}
          onContinue={(editedBadEntries: CSVLineEntry[]) => {
            setEditModal(false)
            // Continue with the edited entries
            importFromBrowser(
              useAuth(),
              values.browser,
              Papa.unparse([
                ...acceptableEntries,
                ...editedBadEntries
              ])
            ).then(tryToImport)
            /**
             * This will create a loop until
             * the import is successful or
             * the user cancels the import
             */
          }}
        />
      </Form>
    }
  </Formik>
}

export default ImportFromBrowserForm
