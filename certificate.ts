/**
 * @module
 * The certificate field.
 *
 * @example
 * ```ts
 * import { createCertificate } from "@zhexin/typebox/certificate"
 * ```
 */

import type { listable } from './types.ts'

export const createCertificate = <
    const C extends certificate,
>(c: C): C => c

/**
 * You should not use this directly, instead use {@link createCertificate}.
 */
export interface certificate {
    /**
     * @default system
     */
    store?: 'system' | 'mozilla' | 'none'
    certificate?: listable<string>
    certificate_path?: listable<string>
    certificate_directory_path?: listable<string>
}
