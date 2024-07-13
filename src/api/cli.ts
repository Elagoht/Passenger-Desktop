import { ChildProcess, Command } from "@tauri-apps/api/shell"
import StringHelper from "@/helpers/string"

export type Output = {
  status: number
  stdout: string
  stderr: string
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
  public static execute = async (
    command: string, args: string[], piped: string = ""
  ): Promise<ChildProcess> => await new Command("sh", [
    "-c", // Empty pipe will no effect, so we can safely use it here.
    `echo ${StringHelper.convertToShellString(piped)} |
    ${CLI.executable
    } ${command
    } ${args.map((argument) =>
      StringHelper.convertToShellString(argument)
    ).join(" ")
    }`
  ], {
    env: {
      "SECRET_KEY": localStorage.getItem("SECRET_KEY") ?? ""
    }
  }).execute()

  /**
   * Reads the output of the process.
   * @param process - The child process to read.
   * @returns The output of the process.
   * @see Output
   */
  public static readOutput = (process: ChildProcess): Output => ({
    status: process.code ?? 1, // 1 is the default error code
    stdout: process.stdout.trim(),
    stderr: process.stderr.trim()
  })
}

const getResponse = async (
  command: string, args: string[], piped: string = ""
): Promise<Output> => CLI.readOutput(await CLI.execute(command, args, piped))

export default getResponse