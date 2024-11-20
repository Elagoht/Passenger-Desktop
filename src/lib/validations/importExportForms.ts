import { mixed, object, string } from "yup"

export const validationImportFromBrowserForm = object().shape({
  browser: string().required("Browser is required"),
  file: mixed()
    .required("Please select a file")
    .test(
      "fileSize",
      "File must be smaller than 10MB.",
      (value) => value && (value as File).size <= 1024 * 1024 * 10
    ).test(
      "fileType",
      "File must be a CSV file.",
      (value) => value && [
        "text/csv",
      ].includes((value as File).type)
    )
})