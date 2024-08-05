type Statistics = {
  totalCount: number
  averageLength: number
  uniquePlatforms: string[]
  uniquePlatformsCount: number
  uniquePassphrases: number
  mostAccessed: ListableDatabaseEntry[]
  commonByPlatform: Array<ListableDatabaseEntry[]>
  percentageOfCommon: number
  mostCommon: string
  strengths: Record<string, number>
  averageStrength: number
  weakPassphrases: ListableDatabaseEntry[]
  mediumPassphrases: ListableDatabaseEntry[]
  strongPassphrases: ListableDatabaseEntry[]
}