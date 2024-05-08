import { shell } from "@tauri-apps/api"

type Output = {
  success: boolean
  output: string
}

class CLI {
  private static executable = "./passenger"

  public static execute = async (command: string, args: string[]): Promise<shell.ChildProcess> =>
    await new shell.Command(
      "sh", ["-c",
      `${CLI.executable
      } ${command
      } ${args.join(" ")
      }`]
    ).execute()

  public static readOutput = (process: shell.ChildProcess): Output => ({
    success: process.code === 0,
    output: process.stdout.trim()
  })
}

export default class Command {
  public static login = async (passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("login", [passphrase]))

  public static register = async (passphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("register", [passphrase]))

  public static reset = async (oldPassphrase: string, newPassphrase: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("reset", [oldPassphrase, newPassphrase]))

  public static fetchAll = async (jwt: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("fetchAll", [jwt]))

  public static query = async (jwt: string, keyword: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("query", [jwt, keyword]))

  public static fetch = async (jwt: string, uuid: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("fetch", [jwt, uuid]))

  public static create = async (jwt: string, data: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("create", [jwt, data]))

  public static update = async (jwt: string, uuid: string, json: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("update", [jwt, uuid, json]))

  public static delete = async (jwt: string, uuid: string): Promise<Output> =>
    CLI.readOutput(await CLI.execute("delete", [jwt, uuid]))

  public static version = async (): Promise<Output> =>
    CLI.readOutput(await CLI.execute("version", []))
}