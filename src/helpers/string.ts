class StringHelper {
  static capitalize = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1)
}

export default StringHelper