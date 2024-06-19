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
  public static execute = async (
    command: string, args: string[], piped: string | null = null
  ): Promise<ChildProcess> => {
    return await new Command("sh", [
      "-c",
      `${piped
        ? `echo ${StringHelper.convertToShellString(piped)} |`
        : ""
      } ${CLI.executable
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
  }

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
