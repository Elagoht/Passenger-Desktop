import { CLI, Output } from "../api/cli"
import { Passphrase } from "../types/common"

/**
 * Commands for interacting with the CLI.
 */
export default class Service {
  /**
   * Generates a JWT to use other Service.
   * @param username - The username for logging in.
   * @param passphrase - The passphrase for logging in.
   * @returns A promise that resolves to the output of the command.
   */
  public static login = async (username: string, passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("login", [username, passphrase]))

  /**
   * Registers a new user with the provided passphrase.
   * @param passphrase - The passphrase for registration.
   * @param passphrase - The passphrase for registration.
   * @returns A promise that resolves to the output of the command.
   */
  public static register = async (username: string, passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("register", [username, passphrase]))

  /**
   * Resets the user's passphrase from the old passphrase to the new passphrase.
   * @param oldPassphrase - The old passphrase.
   * @param newPassphrase - The new passphrase.
   * @returns A promise that resolves to the output of the command.
   */
  public static reset = async (oldPassphrase: string, newPassphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("reset", [oldPassphrase, newPassphrase]))

  /**
   * Fetches all data using the provided JWT.
   * @param jwt - The JWT for authentication.
   * @returns A promise that resolves to the output of the command.
   */
  public static fetchAll = async (jwt: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("fetchAll", [jwt]))

  /**
   * Queries data using the provided JWT and keyword.
   * @param jwt - The JWT for authentication.
   * @param keyword - The keyword for querying.
   * @returns A promise that resolves to the output of the command.
   */
  public static query = async (jwt: string, keyword: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("query", [jwt, keyword]))

  /**
   * Fetches data using the provided JWT and UUID.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to fetch.
   * @returns A promise that resolves to the output of the command.
   */
  public static fetch = async (jwt: string, uuid: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("fetch", [jwt, uuid]))


  /**
   * Creates new data using the provided JWT and data.
   * @param jwt - The JWT for authentication.
   * @param passphrase - The data to create.
   * @returns A promise that resolves to the output of the command.
   */
  public static create = async (jwt: string, passphrase: Passphrase): Promise<Output> =>
    CLI.readOutput(await CLI.execute("create", [jwt, JSON.stringify(passphrase)]))

  /**
   * Updates data using the provided JWT, UUID, and JSON.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to update.
   * @param passphrase - The JSON data for updating.
   * @returns A promise that resolves to the output of the command.
   */
  public static update = async (jwt: string, uuid: string, passphrase: Passphrase): Promise<Output> =>
    CLI.readOutput(await CLI.execute("update", [jwt, uuid, JSON.stringify(passphrase)]))

  /**
   * Deletes data using the provided JWT and UUID.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to delete.
   * @returns A promise that resolves to the output of the command.
   */
  public static delete = async (jwt: string, uuid: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("delete", [jwt, uuid]))

  /**
   * Retrieves the statistics as a JSON object.
   * @param jwt - The JWT for authentication.
   * @returns A promise that resolves to the output of the command.
   */
  public static stats = async (jwt: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("stats", [jwt]))

  /**
   * Retrieves the version information.
   * @returns A promise that resolves to the output of the command.
   */
  public static version = async (): Promise<Output> =>
    CLI.readOutput(await CLI.execute("version", []))
}