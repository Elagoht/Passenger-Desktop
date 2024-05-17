import { object, string } from "yup"

// --- Login form validation --- //
export const validationAuthLoginForm = object().shape({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Enter your username"),
  passphrase: string()
    .required("Enter your passphrase")
})

// --- Register form validation --- //
export const validationAuthRegisterForm = object().shape({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be at most 32 characters")
    .required("Enter your username"),
  passphrase: string()
    .min(12, "Passphrase must be at least 12 characters")
    .test("uppercase", "Passphrase must contain at least one uppercase letter", (value) => /[A-Z]/.test(value!))
    .test("lowercase", "Passphrase must contain at least one lowercase letter", (value) => /[a-z]/.test(value!))
    .test("digits", "Passphrase must contain at least one digit", (value) => /\d/.test(value!))
    .test("special", "Passphrase must contain at least one special character", (value) => /[^A-Za-z0-9]/.test(value!))
    .required("Enter your passphrase")
})