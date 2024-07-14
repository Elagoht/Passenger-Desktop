import { StringSchema, string } from "yup"

export const validateMasterPassphrase: StringSchema = string(
).min(
  12,
  "Passphrase must be at least 12 characters"
).test(
  "uppercase",
  "Passphrase must contain at least one uppercase letter",
  (value) => /[A-Z]/.test(value!)
).test(
  "lowercase",
  "Passphrase must contain at least one lowercase letter",
  (value) => /[a-z]/.test(value!)
).test(
  "digits",
  "Passphrase must contain at least one digit",
  (value) => /\d/.test(value!)
).test(
  "special",
  "Passphrase must contain at least one special character",
  (value) => /[^A-Za-z0-9]/.test(value!)
).required(
  "Enter your passphrase"
)
