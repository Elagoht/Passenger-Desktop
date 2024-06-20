import { CLI, Output } from "../api/cli"
import { DatabaseEntry } from "../types/common"

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
  public static create = async (jwt: string, passphrase: DatabaseEntry): Promise<Output> =>
    CLI.readOutput(await CLI.execute("create", [jwt, JSON.stringify(passphrase)]))

  /**
   * Updates data using the provided JWT, UUID, and JSON.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to update.
   * @param passphrase - The JSON data for updating.
   * @returns A promise that resolves to the output of the command.
   */
  public static update = async (jwt: string, uuid: string, passphrase: DatabaseEntry): Promise<Output> =>
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
   * Imports data using the provided csv content and JWT according
   * to the provided browser type.
   * @param jwt - The JWT for authentication.
   * @param browser - The browser type for importing.
   * @param content - The content of the CSV file.
   */
  public static import = async (jwt: string, browser: string, content: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("import", [jwt, browser], content))

  /**
   * Exports data using the provided JWT in bare or encrypted csv format.
   * @param jwt - The JWT for authentication.
   * @param exportType - The export type for exporting.
   */
  public static export = async (jwt: string, exportType: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("export", [jwt, exportType]))

  /**
   * Declare a constant pair using the provided JWT and key-value pair.
   * @param jwt - The JWT for authentication.
   * @param key - The key of the constant pair.
   * @param value - The value of the constant pair.
   */
  public static declare = async (jwt: string, key: string, value: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("declare", [jwt, key, value]))

  /**
   * Modify a constant pair using the provided JWT and key-value pair.
   * @param jwt - The JWT for authentication.
   * @param key - The key of the constant pair.
   * @param newKey - The new key of the constant pair.
   * @param newValue - The new value of the constant pair.
   * @returns A promise that resolves to the output of the command.
   */
  public static modify = async (jwt: string, key: string, newKey: string, newValue: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("modify", [jwt, key, newKey, newValue]))

  /**
   * Fetches a constant pair using the provided JWT and key.
   * @param jwt - The JWT for authentication.
   * @param key - The key of the constant pair.
   * @returns A promise that resolves to the output of the command.
   */
  public static remember = async (jwt: string, key: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("remember", [jwt, key]))

  /**
   * Removes a constant pair using the provided JWT and key.
   * @param jwt - The JWT for authentication.
   * @param key - The key of the constant pair.
   */
  public static forget = async (jwt: string, key: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("forget", [jwt, key]))

  /**
   * Retrieves all the constant pairs as a JSON object.
   * @param jwt - The JWT for authentication.
   * @returns A promise that resolves to the output of the command.
   */
  public static constants = async (jwt: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("constants", [jwt]))

  /**
   * Generates a new passphrase.
   * @param length - The length of the passphrase. Defaults to 32.
   * @returns A promise that resolves to the output of the command.
   */
  public static generate = async (length: number): Promise<Output> =>
    CLI.readOutput(await CLI.execute("generate", [length.toString()]))

  /**
   * Manipulates the passphrase by changing similar looking characters.
   * @param passphrase - The passphrase to manipulate.
   * @returns A promise that resolves to the output of the command.
   */
  public static manipulate = async (passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("manipulate", [passphrase]))

  /**
   * Retrieves the version information.
   * @returns A promise that resolves to the output of the command.
   */
  public static version = async (): Promise<Output> =>
    CLI.readOutput(await CLI.execute("version", []))
}