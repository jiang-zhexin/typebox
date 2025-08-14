/**
 * @module
 * The ntp field.
 *
 * @example
 * ```ts
 * import { createNtp } from "@zhexin/typebox/ntp"
 * ```
 */

import type { dialer, duration } from './types.ts'

export const createNtp = <
    const N extends ntp<OT[number] | string, DS[number] | string>,
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(n: N, _options?: {
    /**
     * @deprecated
     */
    assertExistOutbounds?: OT
    /**
     * @deprecated
     */
    assertExistDnsServers?: DS
}): N => n

/**
 * You should not use this directly, instead use {@link createNtp}.
 */
export interface ntp<
    O extends string = never,
    DS extends string = never,
> extends dialer<O, DS> {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
