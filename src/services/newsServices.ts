import { apiCaller } from "@/helpers/apiCaller"
import { LeakedData } from "@/types/leakes"

/**
 * Get news from Passenger Landing's API
 * @returns LeakedData array
 */
export const getNews = () => apiCaller<LeakedData[]>({
  url: "https://passenger-landing.vercel.app/api/news"
})