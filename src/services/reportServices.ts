import getResponse from "../api/cli"

/**
 * Retrieves the statistics as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const getStatistics = async (
  jwt: string
): Promise<Output> => {
  return await getResponse(
    "stats", [], {
    headers: {
      JWT: jwt
    }
  })
}

/**
 * Retrieves the report as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const getDetectiveReports = async (
  jwt: string
): Promise<Output> => {
  return await getResponse(
    "detect", [], {
    headers: {
      JWT: jwt
    }
  })
}
