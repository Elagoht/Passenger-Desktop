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
  public passphrasesCount = (): number =>
    this.passphrases.length

  /**
   * @returns the average length of passphrases
   */
  public averagePasswordLength = (): number => {
    return this.passphrases.reduce((acc, curr) =>
      acc + curr.passphrase.length,
      0
    ) / this.passphrasesCount()
  }

  /**
   * @returns how many platforms users have passphrases for
   */
  public uniquePlatforms = (): string[] =>
    Array.from(new Set(this.passphrases.map((passphrase) => passphrase.platform)))

  /**
   * @returns the most accessed passphrases
   */
  public mostAccessedPassphrases = (limit: number): Passphrase[] =>
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
  public commonPasswordsByPlatform = (): Array<Passphrase[]> => {
    const passphrases = this.passphrases
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

  public percentageOfCommonPasswords = (): number => (
    this.commonPasswordsByPlatform().length
    / this.passphrasesCount()
  ) * 100

  public mostCommonPassword = (): string => {
    const commonPasswords = this.commonPasswordsByPlatform()
    const mostCommonPassword = commonPasswords.sort((a, b) => b.length - a.length)[0][0].passphrase
    return mostCommonPassword
  }
  public passphraseStrengths = (): Record<Passphrase["id"], number> => {
    return this.passphrases.reduce((evaluations, passphrase) => {
      evaluations[passphrase.id] = Strength.calculate(passphrase.passphrase)
      return evaluations
    }, {} as Record<Passphrase["id"], number>)
  }

  public averagePassphraseStrength = (): number => {
    const strengths = Object.values(this.passphraseStrengths())
    return strengths.reduce((acc, curr) => acc + curr, 0) / strengths.length
  }

  public passphrasesWithWeakPasswords = (): Passphrase[] => {
    const strengths = this.passphraseStrengths()
    return this.passphrases.filter((passphrase) => strengths[passphrase.id] < 4)
  }

  public passphrasesWithMediumPasswords = (): Passphrase[] => {
    const strengths = this.passphraseStrengths()
    return this.passphrases.filter((passphrase) =>
      strengths[passphrase.id] >= 4 &&
      strengths[passphrase.id] <= 5
    )
  }

  public passphrasesWithStrongPasswords = (): Passphrase[] =>
    this.passphrases.filter((passphrase) =>
      this.passphraseStrengths()[passphrase.id] > 5
    )


}

export default Statistics