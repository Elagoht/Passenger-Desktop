import getResponse, { type Output } from "../api/cli"
import { ReadWriteDatabaseEntry } from "../types/common"
import { Mutable } from "../types/utility"

/**
 * Fetches all data using the provided JWT.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const fetchAllEntries = async (
  jwt: string
): Promise<Output> =>
  await getResponse("fetchAll", [jwt])

/**
 * Queries data using the provided JWT and keyword.
 * @param jwt - The JWT for authentication.
 * @param keyword - The keyword for querying.
 * @returns A promise that resolves to the output of the command.
 */
export const queryEntries = async (
  jwt: string,
  keyword: string
): Promise<Output> =>
  await getResponse("query", [jwt, keyword])

/**
 * Fetches data using the provided JWT and UUID.
 * @param jwt - The JWT for authentication.
 * @param uuid - The UUID of the data to fetch.
 * @returns A promise that resolves to the output of the command.
 */
export const fetchEntry = async (
  jwt: string,
  uuid: string
): Promise<Output> =>
  await getResponse("fetch", [jwt, uuid])

/**
 * Creates new data using the provided JWT and data.
 * @param jwt - The JWT for authentication.
 * @param passphrase - The data to create.
 * @returns A promise that resolves to the output of the command.
 */
export const createEntry = async (
  jwt: string,
  passphrase: Mutable<ReadWriteDatabaseEntry>
): Promise<Output> =>
  await getResponse("create", [jwt, JSON.stringify(passphrase)])

/**
 * Updates data using the provided JWT, UUID, and JSON.
 * @param jwt - The JWT for authentication.
 * @param uuid - The UUID of the data to update.
 * @param passphrase - The JSON data for updating.
 * @returns A promise that resolves to the output of the command.
 */
export const updateEntry = async (
  jwt: string,
  uuid: string,
  passphrase: Mutable<ReadWriteDatabaseEntry>
): Promise<Output> =>
  await getResponse("update", [jwt, uuid, JSON.stringify(passphrase)])

/**
 * Deletes data using the provided JWT and UUID.
 * @param jwt - The JWT for authentication.
 * @param uuid - The UUID of the data to delete.
 * @returns A promise that resolves to the output of the command.
 */
export const deleteEntry = async (
  jwt: string,
  uuid: string
): Promise<Output> =>
  await getResponse("delete", [jwt, uuid])
