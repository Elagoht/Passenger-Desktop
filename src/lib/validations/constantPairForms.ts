import { object, string } from "yup"

// --- Constants Pair Edit Form --- //
export const validationConstantPairForms = object().shape({
  key: string()
    .required("Enter the key"),
  value: string()
    .test(
      "starts-with-prefix",
      "Do not add _$ prefix here",
      (value) => !value?.startsWith("_$")
    )
    .required("A value is needed")
})