
class Cookie {
  public static set(
    name: string,
    value: string,
    seconds: number = 600
  ): void {
    const date = new Date()
    date.setTime(date.getTime() + (seconds * 1000))
    document.cookie = `${name
      }=${value
      }; Expires=${date.toUTCString()
      }; Path=/`
  }

  public static get(cookieName: string): Maybe<string> {
    const cookiePrefix = `${cookieName}=`
    const cookiesArray = document.cookie.split(";")
    for (let cookie of cookiesArray) {
      while (cookie.startsWith(" "))
        cookie = cookie.substring(1)
      if (cookie.startsWith(cookiePrefix))
        return cookie.substring(cookiePrefix.length)
    }
    return null
  }

  public static remove(name: string): void {
    Cookie.set(name, "", -1)
  }
}

export default Cookie