import KeyRing from "../../src/api/keychain"
import { invoke } from "@tauri-apps/api/tauri"

jest.mock("@tauri-apps/api/tauri", () => ({ invoke: jest.fn() }))

describe("KeyRing", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockInvoke = invoke as jest.MockedFunction<typeof invoke>

  describe("write", () => {
    it("should invoke save_key with correct parameters", async () => {
      const username = "testUser"
      const key = "testKey"

      await KeyRing.write(username, key)

      expect(invoke).toHaveBeenCalledWith("save_key", {
        service: "dev.elagoht.passenger",
        username,
        key,
      })
    })

    it("should throw an error if invoke fails", async () => {
      const username = "testUser"
      const key = "testKey"
      mockInvoke.mockRejectedValue(new Error("Invoke failed"))

      await expect(KeyRing.write(
        username,
        key
      )).rejects.toThrow("Failed to save key: Invoke failed")
    })
  })

  describe("read", () => {
    it("should invoke get_key with correct parameters", async () => {
      const username = "testUser"
      const expectedKey = "testKey"
      mockInvoke.mockResolvedValue(expectedKey)

      const result = await KeyRing.read(username)

      expect(invoke).toHaveBeenCalledWith("get_key", {
        service: "dev.elagoht.passenger",
        username,
      })
      expect(result).toBe(expectedKey)
    })

    it("should throw an error if invoke fails", async () => {
      const username = "testUser"
      mockInvoke.mockRejectedValue(new Error("Invoke failed"))

      await expect(KeyRing.read(
        username
      )).rejects.toThrow("Failed to save key: Invoke failed")
    })
  })

  describe("generate", () => {
    it("should generate a string of length 32", () => {
      const result = KeyRing.generate()
      expect(result).toHaveLength(32)
    })

    it("should generate a string with valid characters", () => {
      const result = KeyRing.generate()
      const validCharacters = "0123456789"
        + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        + "abcdefghijklmnopqrstuvwxyz"
        + "@#$%^&*()_+{}[]|\\:;\"'<>,.?/!-=~`"

      for (const char of result) {
        expect(validCharacters).toContain(char)
      }
    })
  })
})