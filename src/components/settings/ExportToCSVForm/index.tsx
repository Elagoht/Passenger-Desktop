import { IconLoader, IconLock, IconLockOpen, IconTableExport } from "@tabler/icons-react"
import { save } from "@tauri-apps/api/dialog"
import { writeTextFile } from "@tauri-apps/api/fs"
import { Form, Formik } from "formik"
import { FC } from "react"
import StringHelper from "../../../helpers/string"
import { useAuthorizationSlice } from "../../../lib/stores/authorization"
import { useNotificationSlice } from "../../../lib/stores/notification"
import Button from "../../formElements/Button"
import Select from "../../formElements/Select"
import { exportToCSV } from "../../../services/dataTransferServices"

const ExportTypeIcons = {
  bare: IconLockOpen,
  encrypted: IconLock
}

const ExportToCSVForm: FC = () => {
  const accessToken = useAuthorizationSlice((state) => state.accessToken)
  const addNotification = useNotificationSlice((state) => state.addNotification)

  return <Formik
    initialValues={{ exportType: "bare" }}
    onSubmit={(values, { setSubmitting }) => {
      exportToCSV( // Get the export data from the CLI
        accessToken,
        values.exportType
      ).then((response) => {
        if (response.status !== 0) return addNotification({
          type: "error", // If unsuccessful, show an error notification
          message: StringHelper.removeUnixErrorPrefix(response.stderr)
        })
        save({ // Open a save file selection dialog
          filters: [{
            name: "passphrases",
            extensions: ["csv"]
          }]
        }).then((path) => {
          if (!path) return addNotification({
            type: "error", // If no file selected, show an error notification
            message: "No file selected"
          })
          writeTextFile( // Write the export data to the selected file
            path,
            response.stdout
          ).then(() => addNotification({ // Show a success notification
            type: "success", message: "Exported successfully"
          }))
        })
      }).finally(() => // Re-enable the form
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
