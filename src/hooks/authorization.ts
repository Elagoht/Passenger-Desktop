import Cookie from "@/helpers/cookies"

/**
 * If the user access token does not exist,
 * the service caller will open re-authentication
 * dialog to get the user's access token again.
 * @returns The access token stored in the cookies
 */
export const useAuth = (): string =>
  Cookie.get("accessToken") || ""