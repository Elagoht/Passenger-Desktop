type CLICommandOptions = {
  readonly piped?: string
  readonly headers?: Record<string, string>
}

type Output = {
  status: number
  stdout: string
  stderr: string
}
