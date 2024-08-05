import { Body, Response, getClient } from "@tauri-apps/api/http"

export const apiCaller = async <Type>({
  url,
  headers,
  body,
  method = "get"
}: {
  url: `https://${string}` // Force HTTPS
  headers?: Record<string, string>
} & ({
  body?: Record<string, string>
  method?: "post" | "put"
} | {
  body: never
  method?: "get" | "delete"
})): Promise<Response<Type>> => await (
  await getClient() // Create a new HTTP client
)[method]<Type>( // Call the specified method
  url,
  ["get", "delete"].includes(method)
    ? undefined
    : Body.json(body!),
  headers
)
