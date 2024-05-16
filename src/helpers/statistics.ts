import { Passphrase } from "../types/common"
import Strength from "./strength"

class Statistics {
  private passphrases: Passphrase[]

  constructor(passphrases: Passphrase[]) {
    this.passphrases = passphrases
  }

  /**
   * @returns the total number of passphrases
   */
  public totalCount = (): number =>
    this.passphrases.length

  /**
   * @returns the average length of passphrases
   */
  public averageLength = (): number => {
    return this.passphrases.reduce((total, current) =>
      total + current.passphrase.length,
      0
    ) / this.totalCount()
  }

  /**
   * @returns how many platforms users have passphrases for
   */
  public uniquePlatforms = (): string[] =>
    Array.from(new Set(this.passphrases.map((passphrase) => passphrase.platform)))

  /**
   * @returns the number of unique passphrases
   */
  public uniqueCount = (): number =>
    Array.from(new Set(this.passphrases.map((passphrase) => passphrase.passphrase))).length

  /**
   * @returns the most accessed passphrases
   */
  public mostAccessed = (limit: number): Passphrase[] =>
    this.passphrases
      .sort((a, b) => b.totalAccesses - a.totalAccesses)
      .slice(0, limit)

  /**
   * @returns array of arrays of passphrase entries uses same passphrase
   * @example 
   * ```ts
   * [[
   *   { platform: "Facebook", passphrase: "password" , ... },
   *   { platform: "Instagram", passphrase: "password", ... }
   * ], [
   *   { platform: "Twitter", passphrase: "123456" , ... },
   *   { platform: "Linkedin", passphrase: "123456", ... },
   *   { platform: "G"ithub", passphrase: "123456",... }
   * ]]
   * ```
   */
  public commonByPlatform = (): Array<Passphrase[]> => {
    const { passphrases } = this
    const commonPasswords: Array<Passphrase[]> = []

    for (const passphrase of passphrases) {
      const commonPassword = passphrases.filter((p) =>
        p.passphrase === passphrase.passphrase
      )

      if (commonPassword.length > 1)
        commonPasswords.push(commonPassword)
    }
    return commonPasswords
  }

  public percentageOfCommon = (): number => (
    this.commonByPlatform().length
    / this.totalCount()
  ) * 100

  public mostCommon = (): string => {
    const commonPasswords = this.commonByPlatform()
    const mostCommonPassword = commonPasswords.sort(
      (a, b) => b.length - a.length
    )[0][0].passphrase
    return mostCommonPassword
  }
  public strengths = (): Record<Passphrase["id"], number> => {
    return this.passphrases.reduce((evaluations, passphrase) => {
      evaluations[passphrase.id] = Strength.calculate(passphrase.passphrase)
      return evaluations
    }, {} as Record<Passphrase["id"], number>)
  }

  public averageStrength = (): number => {
    const strengths = Object.values(this.strengths())
    return strengths.reduce(
      (total, current) => total + current,
      0
    ) / strengths.length
  }

  public weakPassphrases = (): Passphrase[] => {
    const strengths = this.strengths()
    return this.passphrases.filter((passphrase) => strengths[passphrase.id] < 4)
  }

  public mediumPassphrases = (): Passphrase[] => {
    const strengths = this.strengths()
    return this.passphrases.filter((passphrase) =>
      strengths[passphrase.id] >= 4 &&
      strengths[passphrase.id] <= 5
    )
  }

  public strongPassphrases = (): Passphrase[] =>
    this.passphrases.filter((passphrase) =>
      this.strengths()[passphrase.id] > 5
    )
}

export default Statistics