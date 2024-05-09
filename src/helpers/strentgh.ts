type StrengthCriteria = "lowercase" | "uppercase" | "numbers" | "special" | "repeated" | "sequentialNumbers" | "sequentialLetters" | "short" | "medium" | "long" | "veryLong" | "extremelyLong"

class Strength {
  private static criterias: Record<
    StrengthCriteria,
    RegExp
  > = {
      lowercase: /[a-z]/, // Lowercase letters
      uppercase: /[A-Z]/, // Uppercase letters
      numbers: /[0-9]/, // Numbers
      special: /[^a-zA-Z0-9]/, // Special characters
      repeated: /(.)\1{2,}/, // Do not allow more than 2 repeated characters
      sequentialNumbers: /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/, // Do not allow sequential numbers
      // Do not allow sequential letters and at least 8 characters
      sequentialLetters: /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqo|qon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba)/,
      short: /^.{8,}$/, // At least 8 characters
      medium: /^.{12,}$/, // At least 12 characters
      long: /^.{16,}$/, // At least 16 characters
      veryLong: /^.{20,}$/, // At least 20 characters
      extremelyLong: /^.{24,}$/ // At least 24 characters
    }

  private static criteriaScores: Record<
    StrengthCriteria,
    number
  > = {
      lowercase: 1,
      uppercase: 1,
      numbers: 1,
      special: 1,
      repeated: -2,
      sequentialNumbers: -1,
      sequentialLetters: -1,
      short: 1,
      medium: 1,
      long: 1,
      veryLong: 1,
      extremelyLong: 1,
    }

  private static criteriaMessages: Record<
    StrengthCriteria,
    string
  > = {
      lowercase: "At least one lowercase letter",
      uppercase: "At least one uppercase letter",
      numbers: "At least one number",
      special: "At least one special character",
      repeated: "No more than 2 repeated characters",
      sequentialNumbers: "No sequential numbers",
      sequentialLetters: "No sequential letters",
      short: "At least 8 characters",
      medium: "At least 12 characters",
      long: "At least 16 characters",
      veryLong: "At least 20 characters",
      extremelyLong: "At least 24 characters",
    }

  private static scoreTable: Record<
    string,
    string
  > = {
      "-2": "Immediately change this",
      "-1": "Do not consider this",
      "0": "Good start",
      "1": "Unacceptable",
      "2": "Extremely weak",
      "3": "Easily guessable",
      "4": "Should be more varied",
      "5": "Acceptable",
      "6": "Good",
      "7": "Strong",
      "8": "Perfect",
    }

  public static calculate(password: string): number {
    let score = -1 // Short password penalty

    for (const [criteria, regex] of Object.entries(this.criterias))
      if (regex.test(password))
        score += this.criteriaScores[criteria as StrengthCriteria]

    return score
  }

  public static calculatedMessage(score: number):
    typeof this.scoreTable[keyof typeof this.scoreTable] {
    return this.scoreTable[score.toString()]
  }

  public static evaluate(password: string): Record<
    typeof this.criteriaMessages[StrengthCriteria],
    boolean
  > {
    const result: Record<
      typeof this.criteriaMessages[StrengthCriteria],
      boolean
    > = {}

    for (const [criteria, regex] of Object.entries(this.criterias))
      result[this.criteriaMessages[criteria as StrengthCriteria]] = regex.test(password)

    return result
  }
}

export default Strength