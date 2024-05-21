import { shell } from "@tauri-apps/api"
import StringHelper from "../helpers/string"
import { Passphrase } from "../types/common"

type Output = {
  success: boolean
  output: string
}

/**
 * Core API for interacting with the CLI.
 */
class CLI {
  /**
   * The path to the CLI executable.
   */
  private static executable = "./passenger"

  /**
   * Executes a command with the provided arguments.
   * @param command - The verb for the executable
   * @param args - The arguments for the verb.
   * @returns A promise that resolves to the child process.
   */
  public static execute = async (command: string, args: string[]): Promise<shell.ChildProcess> =>
    await new shell.Command(
      "sh", ["-c",
      `${CLI.executable
      } ${command
      } ${args.join(" ")
      }`]
    ).execute()

  /**
   * Reads the output of the process.
   * @param process - The child process to read.
   * @returns The output of the process.
   * @see Output
   */
  public static readOutput = (process: shell.ChildProcess): Output => ({
    success: process.code === 0,
    output: process.stdout.trim()
  })
}

/**
 * Commands for interacting with the CLI.
 */
export default class Commands {
  /**
   * Generates a JWT to use other commands.
   * @param passphrase - The passphrase for logging in.
   * @returns A promise that resolves to the output of the command.
   */
  public static login = async (passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("login", [passphrase]))

  /**
   * Registers a new user with the provided passphrase.
   * @param passphrase - The passphrase for registration.
   * @returns A promise that resolves to the output of the command.
   */
  public static register = async (passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("register", [passphrase]))

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
    CLI.readOutput(await CLI.execute("create", [
      jwt,
      StringHelper.convertToShellString(JSON.stringify(passphrase))
    ]))

  /**
   * Updates data using the provided JWT, UUID, and JSON.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to update.
   * @param passphrase - The JSON data for updating.
   * @returns A promise that resolves to the output of the command.
   */
  public static update = async (jwt: string, uuid: string, passphrase: Passphrase): Promise<Output> =>
    CLI.readOutput(await CLI.execute("update", [
      jwt,
      uuid,
      StringHelper.convertToShellString(JSON.stringify(passphrase))
    ]))

  /**
   * Deletes data using the provided JWT and UUID.
   * @param jwt - The JWT for authentication.
   * @param uuid - The UUID of the data to delete.
   * @returns A promise that resolves to the output of the command.
   */
  public static delete = async (jwt: string, uuid: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("delete", [jwt, uuid]))

  /**
   * Retrieves the version information.
   * @returns A promise that resolves to the output of the command.
   */
  public static version = async (): Promise<Output> =>
    CLI.readOutput(await CLI.execute("version", []))
}