import { object, ref, string } from "yup"
import { validateMasterPassphrase } from "./schemas/passphrase"

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
  passphrase: validateMasterPassphrase
})

// --- Reset master passphrase form validation --- //
export const validationResetMasterPassphraseForm = object().shape({
  currentPassphrase: string()
    .required("Enter your current passphrase"),
  newPassphrase: validateMasterPassphrase,
  confirmPassphrase: string()
    .oneOf([ref("newPassphrase")], "Passphrases must match")
    .required("Confirm your new passphrase")
})