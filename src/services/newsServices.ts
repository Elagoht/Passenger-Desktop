import { apiCaller } from "@/helpers/apiCaller"

/**
 * Get news from Passenger Landing's API
 * @returns LeakedData array
 */
export const getNews = () => apiCaller<Paginated<LeakedData>>({
  url: "https://passenger-landing.vercel.app/api/news"
})