import { object, string } from "yup"

// --- Add Passphrase Form --- //
const validationAddPassphraseForm = object().shape({
  platform: string()
    .required("Platform is required"),
  identity: string()
    .test("is-email", "Invalid email", (value) => {
      if (!value) return true
      return (value.includes("@") && !value.startsWith("@"))
        ? /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?:(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:".+"))@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/.test(value)
        : true
    })
    .required("Identity is required"),
  url: string()
    .test("is-url", "Invalid URL", (value) => {
      if (!value) return true
      return /^(?:[a-zA-Z]+:\/\/)?((([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(value)
    })
    .required("URL is required"),
  passphrase: string()
    .required("Passphrase is required"),
  notes: string()
    .notRequired(),
})
export default validationAddPassphraseForm
