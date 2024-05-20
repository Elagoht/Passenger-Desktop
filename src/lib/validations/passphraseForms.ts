import { object, string } from "yup"

// --- Add Passphrase Form --- //
const validationAddPassphraseForm = object().shape({
  platform: string()
    .required("Platform is required"),
  identity: string()
    .required("Identity is required"),
  url: string()
    .url("Invalid URL").required("URL is required"),
  passphrase: string()
    .required("Passphrase is required"),
  notes: string()
    .notRequired(),
})
export default validationAddPassphraseForm
