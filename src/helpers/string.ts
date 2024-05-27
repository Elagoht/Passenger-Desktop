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

  /**
   * Converts a string to a URL by prepending "http://" if it doesn't already have a protocol.
   * @description This method protects Tauri from openin external URLs in its own window.
   * @param url - The input string.
   * @returns The input string as a URL.
   * @example
   * StringHelper.urlify("example.com") // "https://example.com"
   * StringHelper.urlify("http://example.com") // "https://example.com"
   * StringHelper.urlify("/example") // "https://example"
   * StringHelper.urlify("https://example.com") // "https://example.com"
   * StringHelper.urlify("ftp://example.com") // "ftp://example.com"
   * StringHelper.urlify("sftp://example.com") // "sftp://example.com"
   * StringHelper.urlify("file://example.com") // "file://example.com"
   */
  static urlify = (url: string): string => !url
    ? ""
    : /^[a-zA-Z]+:\/\//.test(url)
      ? url
      : url.startsWith("/")
        ? this.urlify(url.slice(1))
        : `https://${url}`

  /**
   * Converts a string to a typed object.
   * @param input - The input string.
   * @returns The typed object.
   * @description **Do not use** this method for untrusted input.
   */
  static deserialize = <Type>(input: string): Type =>
    JSON.parse(input) as Type
}

export default StringHelper