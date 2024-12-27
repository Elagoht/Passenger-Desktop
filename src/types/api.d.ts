type CLICommandOptions = {
  readonly piped?: string
  readonly headers?: Record<string, string>
}

type Output = {
  readonly status: number
  readonly stdout: string
  readonly stderr: string
}
