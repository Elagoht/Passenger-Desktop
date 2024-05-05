class Pretty {
  static phoneNumber = (phoneNumber: string) => {
    // If there's no phone number, return an empty string
    if (!phoneNumber) return ""
    const value = (phoneNumber
      // Remove all non-digits
      .replace(/\D/g, "")
      // Create capture groups for each section of the phone number
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    ) as RegExpMatchArray
    return !value[2]
      ? value[1]
      : `(${value[1]}) ${value[2]}${value[3]
        ? ` ${value[3]}`
        : ""
      }${value[4]
        ? ` ${value[4]}`
        : ""}`
  }

  static date = (date: string) => {
    // If there's no date, return an empty string
    if (!date) return ""
    const value = (date
      // Remove all non-digits
      .replace(/\D/g, "")
      // Create capture groups for each section of the date
      .match(/(\d{0,2})(\d{0,2})(\d{0,4})/)
    ) as RegExpMatchArray
    if (Number(value[1]) > 31) value[1] = "31"
    if (String(value[1]) === "00") value[1] = "01"
    if (Number(value[2]) > 12) value[2] = "12"
    if (String(value[2]) === "00") value[2] = "01"
    return !value[2]
      ? value[1]
      : `${value[1]}/${value[2]}${value[3]
        ? `/${value[3]}`
        : ""
      }`
  }

  static time = (time: string) => {
    // If there's no time, return an empty string
    if (!time) return ""
    const value = (time
      // Remove all non-digits
      .replace(/\D/g, "")
      // Create capture groups for each section of the time
      .match(/(\d{0,2})(\d{0,2})/)
    ) as RegExpMatchArray
    if (Number(value[1]) > 23) value[1] = "00"
    if (Number(value[2]) > 59) value[2] = "00"
    return !value[2]
      ? value[1]
      : `${value[1]}:${value[2]}`
  }

  static creditCard = (creditCard: string) => {
    // If there's no credit card, return an empty string
    if (!creditCard) return ""
    const value = (creditCard
      // Remove all non-digits
      .replace(/\D/g, "")
      // Create capture groups for each section of the credit card
      .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/)
    ) as RegExpMatchArray
    return !value[2]
      ? value[1]
      : `${value[1]} ${value[2]}${value[3]
        ? ` ${value[3]}`
        : ""
      }${value[4]
        ? ` ${value[4]}`
        : ""
      }`
  }
}

export default Pretty