import { object, string } from "yup"

// --- Login form validation --- //
export const validationAuthLoginForm = object().shape({
  passphrase: string()
    .required("Enter your passphrase")
})