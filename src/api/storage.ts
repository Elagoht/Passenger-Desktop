import { Store } from "tauri-plugin-store-api"

/**
 * Represents a storage class that provides methods for reading and writing data.
 */
class Storage {
  private store: Store

  /**
   * Initializes a new instance of the Storage class.
   * @param file - The file to store the data in. Start with a dot to make it hidden.
   */
  constructor(file: string) {
    this.store = new Store(file)
  }

  /**
   * Writes the specified value to the storage with the given key.
   * @param key - The key to associate the value with.
   * @param value - The value to be stored.
   * @returns A promise that resolves when the value has been successfully written to the storage.
   */
  write = async (key: string, value: string): Promise<void> =>
    await this.store.set(key, value)

  /**
   * Reads the value associated with the specified key from the storage.
   * @param key - The key to retrieve the value for.
   * @returns A promise that resolves to the value associated with the key, or null if the key doesn't exist.
   */
  read = async (key: string): Promise<string | null> =>
    await this.store.get(key)
}

export default Storage