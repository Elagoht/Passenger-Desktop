import { invoke } from "@tauri-apps/api/tauri"

class KeyRing {

  public static write = async (username: string, key: string): Promise<void> => {
    try {
      await invoke(
        "save_key",
        {
          service: "dev.elagoht.passenger",
          username: username,
          key
        }
      )
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to save key: ${error.message}`)
      throw new Error("Failed to save key: Unknown error")
    }
  }

  public static read = async (username: string): Promise<Maybe<string>> => {
    try {
      return await invoke(
        "get_key",
        {
          service: "dev.elagoht.passenger",
          username: username
        }
      )
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to get key: ${error.message}`)
      throw new Error("Failed to get key: Unknown error")
    }
  }

  public static generate = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\:;\"'<>,.?/!-=~`"
    let result = ""
    const length = 32
    Array.from({ length }).forEach(() => {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      )
    })
    return result
  }
}

export default KeyRing