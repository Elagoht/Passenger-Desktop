import { invoke } from "@tauri-apps/api/tauri"

class KeyRing {
  public static write = async (username: string, key: string): Promise<void> => {
    try {
      await invoke("save_key", {
        service: "dev.elagoht.passenger",
        username: username,
        key
      })
    } catch (error) {
      throw new Error(`Failed to save key: ${error instanceof Error
        ? error.message
        : "Unknown error"
        }`
      )
    }
  }

  public static read = async (username: string): Promise<Maybe<string>> => {
    try {
      return await invoke("get_key", {
        service: "dev.elagoht.passenger",
        username: username
      })
    } catch (error) {
      throw new Error(`Failed to save key: ${error instanceof Error
        ? error.message
        : "Unknown error"
        }`
      )
    }
  }

  public static generate = (): string => {
    let result = ""

    const characters = "0123456789"
      + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      + "abcdefghijklmnopqrstuvwxyz"
      + "@#$%^&*()_+{}[]|\\:;\"'<>,.?/!-=~`"

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