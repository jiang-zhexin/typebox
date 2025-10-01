/**
 * @module
 * The log field.
 *
 * @example
 * ```ts
 * import { createLog } from "@zhexin/typebox/log"
 * ```
 */

export const createLog = (l: log): log => l

/**
 * You should not use this directly, instead use {@link createLog}.
 */
export interface log {
    disabled?: boolean
    level?: log_level
    output?: string
    timestamp?: boolean
}

type log_level = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatel' | 'panic'
