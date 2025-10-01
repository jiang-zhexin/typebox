/**
 * @module
 * Typebox - Type safety of sing-box config.
 *
 * @example
 * ```ts
 * import { createTypebox } from "@zhexin/typebox"
 * import { createOutbound } from "@zhexin/typebox/outbound"
 *
 * const ss_out = createOutbound({
 *     type: 'shadowsocks',
 *     tag: 'ss-out',
 *     method: '2022-blake3-aes-128-gcm',
 *     password: '',
 *     server: '',
 *     server_port: 11451,
 *     multiplex: {
 *         enabled: true,
 *     },
 * })
 *
 * const config = createTypebox({
 *     log: {},
 *     dns: {},
 *     endpoints: [],
 *     inbounds: [],
 *     outbounds: [ss_out],
 *     route: {},
 *     experimental: {},
 * })
 * ```
 */

import type { certificate } from './certificate.ts'
import type { dns } from './dns.ts'
import type { endpoint } from './endpoint.ts'
import type { experimental } from './experimental.ts'
import type { inbound } from './inbound.ts'
import type { log } from './log.ts'
import type { ntp } from './ntp.ts'
import type { outbound } from './outbound.ts'
import type { route } from './route.ts'
import type { service } from './service.ts'

/**
 * You should not use this directly, instead use {@link createTypebox}.
 */
export interface typebox<
    O extends outbound<string, E['tag'] | O['tag'], DS['tag']>,
    E extends endpoint<string, E['tag'] | O['tag'], DS['tag']>,
    I extends inbound<string, E['tag'] | O['tag'], DS['tag'], E['tag'] | I['tag'], RS['tag']>,
    S extends service<string, E['tag'] | O['tag'], E['tag'] | I['tag'], DS['tag']>,
    DS extends dns.server<string, E['tag'] | O['tag'], S['tag'], DS['tag']>,
    RS extends route.rule_set<string, E['tag'] | O['tag']>,
> {
    $schema?: string
    log?: log
    dns?: dns<E['tag'] | O['tag'], E['tag'] | I['tag'], S['tag'], RS['tag'], DS>
    endpoints?: E[]
    inbounds?: I[]
    outbounds?: O[]
    route?: route<E['tag'] | O['tag'], E['tag'] | I['tag'], DS['tag'], RS>
    services?: S[]
    experimental?: experimental
    ntp?: ntp<E['tag'] | O['tag'], DS['tag']>
    certificate?: certificate
}

/**
 * @example
 * ```ts
 * import { createTypebox } from "@zhexin/typebox"
 *
 * const config = createTypebox({
 *     log: {},
 *     dns: {},
 *     endpoints: [],
 *     inbounds: [],
 *     outbounds: [],
 *     route: {},
 *     experimental: {},
 * })
 * ```
 */
export const createTypebox = <
    outbound_tag extends string,
    inbound_tag extends string,
    endpoint_tag extends string,
    dns_server_tag extends string,
    rule_set_tag extends string,
    service_tag extends string,
    DS extends dns.server<dns_server_tag, E['tag'] | O['tag'], S['tag'], DS['tag']> = never,
    RS extends route.rule_set<rule_set_tag, E['tag'] | O['tag']> = never,
    O extends outbound<outbound_tag, E['tag'] | O['tag'], DS['tag']> = never,
    E extends endpoint<endpoint_tag, E['tag'] | O['tag'], DS['tag']> = never,
    I extends inbound<inbound_tag, E['tag'] | O['tag'], DS['tag'], E['tag'] | I['tag'], RS['tag']> = never,
    S extends service<service_tag, E['tag'] | O['tag'], E['tag'] | I['tag'], DS['tag']> = never,
>(typebox: typebox<O, E, I, S, DS, RS>): typebox<O, E, I, S, DS, RS> => typebox
