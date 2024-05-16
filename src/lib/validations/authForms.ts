import { object, string } from "yup"

// --- Login form validation --- //
export const validationAuthLoginForm = object().shape({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Enter your username"),
  passphrase: string()
    .required("Enter your passphrase")
})