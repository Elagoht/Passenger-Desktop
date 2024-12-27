type Statistics = {
  readonly totalCount: number
  readonly averageLength: number
  readonly uniquePlatforms: string[]
  readonly uniquePlatformsCount: number
  readonly uniquePassphrases: number
  readonly mostAccessed: ListableDatabaseEntry[]
  readonly commonByPlatform: Array<ListableDatabaseEntry[]>
  readonly percentageOfCommon: number
  readonly mostCommon: string
  readonly strengths: Record<string, number>
  readonly averageStrength: number
  readonly weakPassphrases: ListableDatabaseEntry[]
  readonly mediumPassphrases: ListableDatabaseEntry[]
  readonly strongPassphrases: ListableDatabaseEntry[]
}