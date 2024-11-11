type log_level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatel' | 'panic'

export interface log {
    disabled?: boolean
    level?: log_level
    output?: string
    timestamp?: boolean
}
