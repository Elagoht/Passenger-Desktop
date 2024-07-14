import { ListableDatabaseEntry } from "./common"

export type DetectiveReport = {
  readonly commonPassphrases: ListableDatabaseEntry[][]
  readonly similarWithUsername: ListableDatabaseEntry[]
  readonly weakPassphrases: ListableDatabaseEntry[]
  readonly oldPassphrases: ListableDatabaseEntry[]
}