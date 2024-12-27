import StringHelper from "@/helpers/string"
import { authStore } from "@/lib/stores/authorization"
import { ChildProcess, Command } from "@tauri-apps/api/shell"

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
  public static execute = async (
    command: string, args: string[], { piped, headers }: CLICommandOptions
  ): Promise<ChildProcess> => await new Command("sh", [
    "-c", // Empty pipe will no effect, so we can safely use it here.
    `echo ${StringHelper.convertToShellString(piped ?? "")} |
    ${CLI.executable
    } ${command
    } ${args.map((argument) =>
      StringHelper.convertToShellString(argument)
    ).join(" ")
    }`
  ], {
    env: {
      "SECRET_KEY": localStorage.getItem("SECRET_KEY") ?? "",
      ...headers
    }
  }).execute()

  /**
   * Reads the output of the process.
   * @param process - The child process to read.
   * @returns The output of the process.
   * @see Output
   */
  public static readOutput = (
    process: ChildProcess
  ): Awaited<Promise<Output>> => ({
    status: process.code ?? 1, // 1 is the default error code
    stdout: process.stdout.trim(),
    stderr: process.stderr.trim()
  })
}

/**
 * Options for a CLI command.
 */
const getResponse = async (
  command: string,
  args: string[],
  { piped, headers }: CLICommandOptions = {}
): Promise<Output> => {
  const output = CLI.readOutput(await CLI.execute(command, args, {
    piped, headers
  }))
  /**
   * Exit code 41 represents HTTP 401 Unauthorized.
   * This means that the user's access token is invalid.
   * Even though we do not redirect the user to the login page,
   * instead we open a dialog to re-authenticate the user
   * to make user be able to continue current operation.
   */
  if (output.status === 41) authStore.getState().openReAuthModal()

  return output
}

export default getResponse