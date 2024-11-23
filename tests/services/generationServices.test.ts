import getResponse from "@/api/cli"
import { generatePassphrase, manipulatePassphrase } from "@/services/generationServices"

jest.mock("../api/cli")

describe("generationServices", () => {
  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  describe("generatePassphrase", () => {
    it("should call getResponse with correct arguments", async () => {
      const length = 32
      const mockOutput: Output = {
        status: 0,
        stdout: "examplePassphrase",
        stderr: ""
      }

      mockGetResponse.mockResolvedValue(mockOutput)
      const result = await generatePassphrase(length)
      expect(getResponse).toHaveBeenCalledWith(
        "generate", [
        length.toString()
      ])
      expect(result).toEqual(mockOutput)
    })
  })

  describe("manipulatePassphrase", () => {
    it("should call getResponse with correct arguments", async () => {
      const passphrase = "examplePassphrase"
      const mockOutput: Output = {
        status: 0,
        stdout: "examplePassphrase",
        stderr: ""
      }
      mockGetResponse.mockResolvedValue(mockOutput)

      const result = await manipulatePassphrase(passphrase)

      expect(getResponse).toHaveBeenCalledWith(
        "manipulate", [
        passphrase
      ])
      expect(result).toEqual(mockOutput)
    })
  })
})