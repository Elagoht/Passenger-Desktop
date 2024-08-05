import getResponse from "../api/cli"

/**
 * Generates a new passphrase.
 * @param length - The length of the passphrase. Defaults to 32.
 * @returns A promise that resolves to the output of the command.
 */
export const generatePassphrase = async (
  length: number
): Promise<Output> =>
  await getResponse(
    "generate", [
    length.toString()
  ])

/**
 * Manipulates the passphrase by changing similar looking characters.
 * @param passphrase - The passphrase to manipulate.
 * @returns A promise that resolves to the output of the command.
 */
export const manipulatePassphrase = async (
  passphrase: string
): Promise<Output> =>
  await getResponse(
    "manipulate", [
    passphrase
  ])
