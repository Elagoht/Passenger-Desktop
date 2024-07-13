import getResponse, { type Output } from "../api/cli"

/**
 * Retrieves the statistics as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const getStatistics = async (
  jwt: string
): Promise<Output> =>
  await getResponse("stats", [jwt])
