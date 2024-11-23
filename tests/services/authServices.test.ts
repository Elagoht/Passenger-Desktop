import getResponse from "@/api/cli"
import { loginToPassenger, registerToPassenger, resetMasterPassphrase } from "@/services/authServices"

jest.mock("@/api/cli")

describe("authServices", () => {
  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  afterEach(() => jest.clearAllMocks())

  describe("loginToPassenger", () => {
    it(
      "should call getResponse with correct parameters for login",
      async () => {
        const username = "testUser"
        const passphrase = "testPass"
        const expectedOutput: Output = {
          status: 0,
          stdout: "testJwt",
          stderr: ""
        }

        mockGetResponse.mockResolvedValue(expectedOutput)
        const result = await loginToPassenger(username, passphrase)
        expect(mockGetResponse).toHaveBeenCalledWith(
          "login", [
          username,
          passphrase
        ])
        expect(result).toEqual(expectedOutput)
      })
  })

  describe("registerToPassenger", () => {
    it(
      "should call getResponse with correct parameters for registration",
      async () => {
        const username = "newUser"
        const passphrase = "newPass"
        const expectedOutput: Output = {
          status: 0,
          stdout: "testJwt",
          stderr: ""
        }

        mockGetResponse.mockResolvedValue(expectedOutput)
        const result = await registerToPassenger(
          username,
          passphrase
        )
        expect(mockGetResponse).toHaveBeenCalledWith(
          "register", [
          username,
          passphrase
        ])
        expect(result).toEqual(expectedOutput)
      })
  })

  describe("resetMasterPassphrase", () => {
    it(
      "should call getResponse with correct parameters for resetting passphrase",
      async () => {
        const jwt = "testJwt"
        const oldPassphrase = "oldPass"
        const newPassphrase = "newPass"
        const expectedOutput: Output = {
          status: 0,
          stdout: "testJwt",
          stderr: ""
        }

        mockGetResponse.mockResolvedValue(expectedOutput)
        const result = await resetMasterPassphrase(
          jwt,
          oldPassphrase,
          newPassphrase
        )
        expect(mockGetResponse).toHaveBeenCalledWith(
          "reset", [
          oldPassphrase,
          newPassphrase
        ], {
          headers: { JWT: jwt },
        })
        expect(result).toEqual(expectedOutput)
      })
  })
})