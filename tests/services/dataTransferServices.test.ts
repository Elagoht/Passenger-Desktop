import getResponse from "@/api/cli"
import { exportToCSV, importFromBrowser } from "@/services/dataTransferServices"

jest.mock("@/api/cli")

describe("dataTransferServices", () => {
  const jwt = "test-jwt"
  const browser = "chrome"
  const content = "name,email\nJohn Doe,john@example.com"
  const exportType = "bare"

  beforeEach(() => jest.clearAllMocks())

  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  describe("importFromBrowser", () => {
    it("should call getResponse with correct parameters", async () => {
      const mockResponse: Output = {
        status: 0,
        stdout: "Success",
        stderr: ""
      }

      mockGetResponse.mockResolvedValue(mockResponse)
      const result = await importFromBrowser(jwt, browser, content)
      expect(getResponse).toHaveBeenCalledWith("import", [browser], {
        headers: { JWT: jwt },
        piped: content,
      })
      expect(result).toEqual(mockResponse)
    })

    it("should handle errors", async () => {
      const mockError = new Error("Import failed")
      mockGetResponse.mockRejectedValue(mockError)

      await expect(importFromBrowser(
        jwt,
        browser,
        content
      )).rejects.toThrow("Import failed")
    })
  })

  describe("exportToCSV", () => {
    it("should call getResponse with correct parameters", async () => {
      const mockResponse: Output = {
        status: 0,
        stdout: "Success",
        stderr: ""
      }

      mockGetResponse.mockResolvedValue(mockResponse)
      const result = await exportToCSV(jwt, exportType)
      expect(getResponse).toHaveBeenCalledWith(
        "export", [
        jwt,
        exportType
      ], {
        headers: { JWT: jwt },
      })
      expect(result).toEqual(mockResponse)
    })

    it("should handle errors", async () => {
      const mockError = new Error("Export failed")
      mockGetResponse.mockRejectedValue(mockError)

      await expect(exportToCSV(
        jwt,
        exportType
      )).rejects.toThrow("Export failed")
    })
  })
})