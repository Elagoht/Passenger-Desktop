export type LeakedData = {
  readonly Name: string
  readonly Title: string
  readonly Domain: string
  readonly BreachDate: string
  readonly PwnCount: number
  readonly Description: string
  readonly LogoPath: string
  readonly DataClasses: string[]
}

export type Paginated<DataType> = {
  readonly data: DataType[]
  readonly got: number
  readonly page: number
  readonly take: number
  readonly total: number
}