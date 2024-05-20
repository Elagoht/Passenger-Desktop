/**
 * A helper class for string manipulation.
 */
class StringHelper {
  /**
   * Capitalizes the first letter of a string.
   * @param input - The input string.
   * @returns The input string with the first letter capitalized.
   */
  static capitalize = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1)

  /**
   * Removes the "passenger:" prefix from a string and trims any leading or trailing whitespace.
   * @param input - The input string.
   * @returns The input string with the "passenger:" prefix removed and any leading or trailing whitespace trimmed.
   */
  static removeUnixErrorPrefix = (input: string) =>
    this.capitalize(
      input.replace(/passenger:/g, "").trim()
    )

  /**
   * Converts a string to a shell string by escaping single quotes.
   * @param input - The input string.
   * @returns The input string with single quotes escaped.
   */
  static convertToShellString = (input: string) =>
    `'${input.replace(/'/g, "\\'")}'`
}

export default StringHelper