/**
 * @module
 * The ntp field.
 *
 * @example
 * ```ts
 * import { createNtp } from "@zhexin/typebox/ntp"
 * ```
 */

import type { dialer, duration, server } from './types.ts'

export const createNtp = <
    outbound_tag extends string = never,
    dns_server_tag extends string = never,
>(n: ntp<outbound_tag, dns_server_tag>): ntp<outbound_tag, dns_server_tag> => n

/**
 * You should not use this directly, instead use {@link createNtp}.
 */
export interface ntp<
    outbound_tag extends string,
    dns_server_tag extends string,
> extends dialer<outbound_tag, dns_server_tag>, server {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
