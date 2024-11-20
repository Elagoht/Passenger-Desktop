import getResponse from "@/api/cli"

/**
 * Generates a JWT to use other Service.
 * @param username - The username for logging in.
 * @param passphrase - The passphrase for logging in.
 * @returns A promise that resolves to the output of the command.
 */
export const loginToPassenger = async (
  username: string,
  passphrase: string
): Promise<Output> =>
  await getResponse(
    "login", [
    username,
    passphrase
  ])

/**
 * Registers a new user with the provided passphrase.
 * @param username - The username for registration.
 * @param passphrase - The passphrase for registration.
 * @returns A promise that resolves to the output of the command.
 */
export const registerToPassenger = async (
  username: string,
  passphrase: string
): Promise<Output> =>
  await getResponse(
    "register", [
    username,
    passphrase
  ])

/**
 * Resets the user's passphrase from the old passphrase to the new passphrase.
 * @param jwt - The JWT of the user.
 * @param oldPassphrase - The old passphrase.
 * @param newPassphrase - The new passphrase.
 * @returns A promise that resolves to the output of the command.
 */
export const resetMasterPassphrase = async (
  jwt: string,
  oldPassphrase: string,
  newPassphrase: string
): Promise<Output> =>
  await getResponse(
    "reset", [
    oldPassphrase,
    newPassphrase
  ], {
    headers: {
      JWT: jwt
    }
  })
