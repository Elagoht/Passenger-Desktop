import getResponse from "@/api/cli"
import { getDetectiveReports, getStatistics } from "@/services/reportServices"

jest.mock("@/api/cli")

describe("reportServices", () => {
  const jwt = "test-jwt"
  const mockResponse: Output = {
    status: 0,
    stdout: "test-stdout",
    stderr: "test-stderr",
  }

  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("getStatistics", () => {
    it("should call getResponse with correct parameters", async () => {
      mockGetResponse.mockResolvedValue(mockResponse)

      const result = await getStatistics(jwt)

      expect(getResponse).toHaveBeenCalledWith(
        "stats", [], {
        headers: { JWT: jwt }
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe("getDetectiveReports", () => {
    it("should call getResponse with correct parameters", async () => {
      mockGetResponse.mockResolvedValue(mockResponse)

      const result = await getDetectiveReports(jwt)

      expect(getResponse).toHaveBeenCalledWith("detect",
        [], {
        headers: { JWT: jwt, },
      })
      expect(result).toEqual(mockResponse)
    })
  })
})