import Button from "@/components/formElements/Button"
import Select from "@/components/formElements/Select"
import Toast from "@/helpers/notifications"
import handleResponse from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { exportToCSV } from "@/services/dataTransferServices"
import { IconFileAlert, IconLoader, IconLock, IconLockOpen, IconTableExport } from "@tabler/icons-react"
import { save } from "@tauri-apps/api/dialog"
import { writeTextFile } from "@tauri-apps/api/fs"
import { Form, Formik } from "formik"
import { FC } from "react"

const ExportTypeIcons = {
  bare: IconLockOpen,
  encrypted: IconLock
}

const ExportToCSVForm: FC = () => {
  const accessToken = authStore((state) => state.accessToken)

  return <Formik
    initialValues={{ exportType: "bare" }}
    onSubmit={(values, { setSubmitting }) => {
      exportToCSV( // Get the export data from the CLI
        accessToken,
        values.exportType
      ).then((response) => handleResponse(
        response,
        [() => save({
          filters: [{
            name: "passphrases",
            extensions: ["csv"]
          }]
        }).then((path) => {
          if (!path) return Toast.error({
            title: "No file selected",
            message: "Please select a file path to export the data",
            icon: IconFileAlert
          })
          writeTextFile( // Write the export data to the selected file
            path,
            response.stdout
          ).then(() => Toast.success({ // Show a success notification
            title: "Exported successfully",
            message: "Do not share this file with anyone!",
            icon: IconTableExport
          }))
        })],
        [() => void 0, {
          errorTitle: "Couldn't export data at the moment",
          errorMessage: StringHelper.removeUnixErrorPrefix(response.stderr)
        }],
      )).finally(() =>
        setSubmitting(false)
      )
    }}
  >
    {({
      values,
      handleChange,
      isSubmitting
    }) =>
      <Form className="flex flex-col gap-4">
        <Select
          label="Export Type"
          name="exportType"
          value={values.exportType}
          onChange={handleChange}
          optional={false}
          iconLeft={ExportTypeIcons[values.exportType as keyof typeof ExportTypeIcons]}
        >
          <option value="bare">Bare</option>
          <option value="encrypted">Encrypted</option>
        </Select>

        <Button
          color="danger"
          disabled={isSubmitting}
          rightIcon={isSubmitting
            ? <IconLoader className="animate-spin" />
            : <IconTableExport />
          }
        >
          Export
        </Button>
      </Form >
    }
  </Formik >
}

export default ExportToCSVForm
