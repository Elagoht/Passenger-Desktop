import { invoke } from "@tauri-apps/api/tauri"

class KeyChain {
  service: string = "dev.elagoht.passenger"
  username: string

  constructor(username: string) {
    this.username = username
  }

  async write(key: string): Promise<void> {
    try {
      await invoke("save_key",
        {
          service: this.service,
          username: this.username,
          key
        }
      )
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to save key: ${error.message}`)
      throw new Error("Failed to save key: Unknown error")
    }
  }

  async read(): Promise<string | null> {
    try {
      return await invoke(
        "get_key",
        {
          service: this.service,
          username: this.username
        }
      )
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to get key: ${error.message}`)
      throw new Error("Failed to get key: Unknown error")
    }
  }
}

export default KeyChain