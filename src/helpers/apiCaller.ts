export const apiCaller = ({
  url,
  body,
  method = "GET"
}: {
  url: `https://${string}` // Force HTTPS
  body?: unknown
  method?: "GET" | "POST" | "PUT" | "DELETE"
}) => fetch(url, {
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
})