import { apiCaller } from "@/helpers/apiCaller"

/**
 * Get news from Passenger Landing's API
 * @returns LeakedData array
 */
export const getNews = (
  page: number = 1
) => {
  return apiCaller<Paginated<LeakedData>>({
    url: `https://passenger-landing.vercel.app/api/breaches?page=${page}`
  })
}