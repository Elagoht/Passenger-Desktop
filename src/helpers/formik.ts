class FormikHelper {
  public static isEdited = (initialValues: object, values: object): boolean =>
    Object
      .keys(initialValues)
      .some((key) =>
        !Object.keys(values).includes(key)
        || initialValues[key as keyof typeof initialValues]
        !== values[key as keyof typeof values]
      )
}

export default FormikHelper