import { object, string } from "yup"

// --- Constants Pair Edit Form --- //
export const validationConstantPairForms = object().shape({
  key: string()
    .test(
      "starts-with-prefix",
      "Do not add _$ prefix here",
      (value) => !value?.startsWith("_$")
    )
    .required("Enter the key"),
  value: string()
    .required("A value is needed")
})