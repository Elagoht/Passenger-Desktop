import { apiCaller } from "@/helpers/apiCaller"
import { getNews } from "@/services/newsServices"
import { Response } from "@tauri-apps/api/http"

jest.mock("@/helpers/apiCaller")

describe("getNews", () => {
  const mockApiCaller = apiCaller as jest.MockedFunction<
    typeof apiCaller
  >

  it("should call apiCaller with the correct URL", async () => {
    const mockResponse: Response<object> = new Response({
      status: 200,
      data: { items: [], total: 0 },
      url: "https://passenger-landing.vercel.app/api/breaches",
      headers: {},
      rawHeaders: {}
    })
    mockApiCaller.mockResolvedValue(mockResponse)

    const result = await getNews()

    expect(apiCaller).toHaveBeenCalledWith({
      url: "https://passenger-landing.vercel.app/api/breaches"
    })
    expect(result).toEqual(mockResponse)
  })

  it("should handle errors from apiCaller", async () => {
    const mockError = new Error("Network Error")
    mockApiCaller.mockRejectedValue(mockError)

    await expect(getNews()).rejects.toThrow("Network Error")
  })
})