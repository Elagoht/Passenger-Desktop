export type CLICommandOptions = {
  readonly piped?: string
  readonly headers?: Record<string, string>
}

export type Output = {
  status: number
  stdout: string
  stderr: string
}
