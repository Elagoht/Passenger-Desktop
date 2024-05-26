import { ListablePassphrase } from "./common"

export type Statistics = {
  totalCount: number
  averageLength: number
  uniquePlatforms: string[]
  uniquePlatformsCount: number
  uniquePassphrases: number
  mostAccessed: ListablePassphrase[]
  commonByPlatform: Array<ListablePassphrase[]>
  percentageOfCommon: number
  mostCommon: string
  strengths: Record<string, number>
  averageStrength: number
  weakPassphrases: ListablePassphrase[]
  mediumPassphrases: ListablePassphrase[]
  strongPassphrases: ListablePassphrase[]
}