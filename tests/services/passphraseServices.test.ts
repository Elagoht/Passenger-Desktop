import getResponse from "@/api/cli"
import { createEntry, deleteEntry, fetchAllEntries, fetchEntry, queryEntries, updateEntry } from "@/services/passphraseServices"

jest.mock("@/api/cli")

describe("passphraseServices", () => {
  const jwt = "test-jwt"
  const uuid = "test-uuid"
  const keyword = "test-keyword"
  const passphrase: Mutable<ReadWriteDatabaseEntry> = {
    notes: "test-notes"
  }
  const output: Output = {
    status: 0,
    stdout: "test-stdout",
    stderr: "test-stderr"
  }

  const mockGetResponse = getResponse as jest.MockedFunction<
    typeof getResponse
  >

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetResponse.mockResolvedValue(output)
  })

  it(
    "fetchAllEntries should call getResponse with correct parameters",
    async () => {
      const result = await fetchAllEntries(jwt)
      expect(getResponse).toHaveBeenCalledWith(
        "fetchAll", [], {
        headers: { JWT: jwt }
      })
      expect(result).toEqual(output)
    })

  it(
    "queryEntries should call getResponse with correct parameters",
    async () => {
      const result = await queryEntries(jwt, keyword)
      expect(getResponse).toHaveBeenCalledWith(
        "query", [
        keyword
      ], {
        headers: { JWT: jwt }
      })
      expect(result).toEqual(output)
    })

  it(
    "fetchEntry should call getResponse with correct parameters",
    async () => {
      const result = await fetchEntry(jwt, uuid)
      expect(getResponse).toHaveBeenCalledWith(
        "fetch", [
        uuid
      ], {
        headers: { JWT: jwt }
      })
      expect(result).toEqual(output)
    })

  it("createEntry should call getResponse with correct parameters", async () => {
    const result = await createEntry(jwt, passphrase)
    expect(getResponse).toHaveBeenCalledWith("create", [JSON.stringify(passphrase)], { headers: { JWT: jwt } })
    expect(result).toEqual(output)
  })

  it("updateEntry should call getResponse with correct parameters", async () => {
    const result = await updateEntry(jwt, uuid, passphrase)
    expect(getResponse).toHaveBeenCalledWith("update", [uuid, JSON.stringify(passphrase)], { headers: { JWT: jwt } })
    expect(result).toEqual(output)
  })

  it("deleteEntry should call getResponse with correct parameters", async () => {
    const result = await deleteEntry(jwt, uuid)
    expect(getResponse).toHaveBeenCalledWith("delete", [uuid], { headers: { JWT: jwt } })
    expect(result).toEqual(output)
  })
})