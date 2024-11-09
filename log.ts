export interface log {
    disabled?: boolean
    level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatel' | 'panic'
    output?: string
    timestamp?: boolean
}
