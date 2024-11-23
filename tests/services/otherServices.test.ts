import getResponse from "@/api/cli"
import { versionNumber } from "@/services/otherServices"

jest.mock("@/api/cli")

describe("versionNumber", () => {
  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  it('should call getResponse with "version" and an empty array', async () => {
    const mockOutput: Output = {
      status: 0,
      stdout: "v0.0.1",
      stderr: ""
    }
    mockGetResponse.mockResolvedValue(mockOutput)

    const result = await versionNumber()

    expect(getResponse).toHaveBeenCalledWith("version", [])
    expect(result).toEqual(mockOutput)
  })

  it("should handle errors thrown by getResponse", async () => {
    const mockError = new Error("Failed to get version")
    mockGetResponse.mockRejectedValue(mockError)

    await expect(versionNumber()).rejects.toThrow("Failed to get version")
  })
})