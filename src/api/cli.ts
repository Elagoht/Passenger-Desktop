import { ChildProcess, Command } from "@tauri-apps/api/shell"
import StringHelper from "../helpers/string"

export type Output = {
  success: boolean
  output: string
}

/**
 * Core API for interacting with the CLI.
 */
export class CLI {
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
  public static execute = async (command: string, args: string[]): Promise<ChildProcess> =>
    await new Command(
      "sh", ["-c",
      `${CLI.executable
      } ${command
      } ${args.map((argument) =>
        StringHelper.convertToShellString(argument)
      ).join(" ")
      }`]
    ).execute()

  /**
   * Reads the output of the process.
   * @param process - The child process to read.
   * @returns The output of the process.
   * @see Output
   */
  public static readOutput = (process: ChildProcess): Output => ({
    success: process.code === 0,
    output: process.stdout.trim()
  })
}
