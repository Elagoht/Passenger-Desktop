import { Output } from "@/types/api"
import getResponse from "../api/cli"

/**
 * Declare a constant pair using the provided JWT and key-value pair.
 * @param jwt - The JWT for authentication.
 * @param key - The key of the constant pair.
 * @param value - The value of the constant pair.
 */
export const declareConstantPair = async (
  jwt: string,
  key: string,
  value: string
): Promise<Output> =>
  await getResponse(
    "declare", [
    key,
    value
  ], {
    headers: {
      JWT: jwt
    }
  })

/**
 * Modify a constant pair using the provided JWT and key-value pair.
 * @param jwt - The JWT for authentication.
 * @param key - The key of the constant pair.
 * @param newKey - The new key of the constant pair.
 * @param newValue - The new value of the constant pair.
 * @returns A promise that resolves to the output of the command.
 */
export const modifyConstantPair = async (
  jwt: string,
  key: string,
  newKey: string,
  newValue: string
): Promise<Output> =>
  await getResponse(
    "modify", [
    key,
    newKey,
    newValue
  ], {
    headers: {
      JWT: jwt
    }
  })

/**
 * Fetches a constant pair using the provided JWT and key.
 * @param jwt - The JWT for authentication.
 * @param key - The key of the constant pair.
 * @returns A promise that resolves to the output of the command.
 */
export const rememberConstantPair = async (
  jwt: string,
  key: string
): Promise<Output> =>
  await getResponse(
    "remember", [
    key
  ], {
    headers: {
      JWT: jwt
    }
  })

/**
 * Removes a constant pair using the provided JWT and key.
 * @param jwt - The JWT for authentication.
 * @param key - The key of the constant pair.
 */
export const forgetConstantPair = async (
  jwt: string,
  key: string
): Promise<Output> =>
  await getResponse(
    "forget", [
    key
  ], {
    headers: {
      JWT: jwt
    }
  })

/**
 * Retrieves all the constant pairs as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const fetchAllConstantPairs = async (
  jwt: string
): Promise<Output> =>
  await getResponse(
    "constants", [], {
    headers: {
      JWT: jwt
    }
  })
