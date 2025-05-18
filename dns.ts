/**
 * @module
 * The dns field.
 *
 * @example
 * ```ts
 * import { createDnsServer, createDnsServers, createDnsRule } from "@zhexin/typebox/dns"
 * ```
 */

import type { action_reject, base_logical_rule, default_rule_with_metadata } from './rule.ts'
import type { client_tls } from './tls.ts'
import type { dialer, duration, item_with_tag, listable, options, resolver, strategy } from './types.ts'
import type { headers } from './types.ts'

/**
 * @example
 * ```ts
 * const alidns = createDnsServer({
 *     type: 'https',
 *     tag: 'ali',
 *     server: '223.5.5.5',
 *     detour: 'c',
 * }, { assertExistOutbounds: ['c'] })
 * ```
 */
export const createDnsServer = <
    const DS extends dns.server<OT[number], ST[number], DST[number]>,
    const DST extends readonly string[] = never,
    const ST extends readonly string[] = never,
    const OT extends readonly string[] = never,
>(server: DS, _options?: {
    assertExistDnsServers?: DST
    assertExistService?: ST
    assertExistOutbounds?: OT
}): DS => server

export const createDnsServers = <
    const DS extends readonly dns.server<OT[number], ST[number], DS[number]['tag'] | DST[number]>[],
    const OT extends readonly string[] = never,
    const ST extends readonly string[] = never,
    const DST extends readonly string[] = never,
>(server: DS, _options?: {
    assertExistOutbounds?: OT
    assertExistService?: ST
    assertExistDnsServers?: DST
}): DS => server

export const createDnsRule = <
    const R extends rule<OT[number] | 'any', IT[number], RS[number], DS[number]>,
    const OT extends readonly string[] = never,
    const IT extends readonly string[] = never,
    const RS extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(r: R, _options?: {
    assertExistOutbounds?: OT
    assertExistInbounds?: IT
    assertExistRuleSet?: RS
    assertExistDnsServers?: DS
}): R => r

/**
 * You should not use this directly, instead use {@link createDnsServer} or {@link createDnsRule}.
 */
export interface dns<
    O extends string = never,
    I extends string = never,
    S extends string = never,
    RS extends string = never,
    DS extends readonly dns.server<O, S, DS[number]['tag']>[] = never,
> {
    servers?: DS
    rules?: rule<O | 'any', I, RS, DS[number]['tag']>[]
    final?: DS[number]['tag']
    reverse_mapping?: boolean
    strategy?: strategy
    disable_cache?: boolean
    disable_expire?: boolean
    independent_cache?: boolean
    cache_capacity?: number
    client_subnet?: string
    /**
     * @deprecated Legacy fake-ip configuration is deprecated and will be removed in sing-box 1.14.0
     * @since 1.12.0
     */
    fakeip?: {
        enabled: true
        inet4_range: string
        inet6_range: string
    }
}

export declare namespace dns {
    export type server<O extends string = never, S extends string = never, DS extends string = never> =
        | legacy<O, DS>
        | local<O, DS>
        | hosts
        | tcp<O, DS>
        | udp<O, DS>
        | tls<O, DS>
        | quic<O, DS>
        | https<O, DS>
        | h3<O, DS>
        | dhcp<O, DS>
        | fakeip
        | tailscale<O>
        | resolved<S>
    export { rule }
}
/**
 * @deprecated Legacy DNS servers is deprecated and will be removed in sing-box 1.14.0
 * @since 1.12.0
 */
interface legacy<O extends string = never, DS extends string = never> extends item_with_tag {
    address: string
    address_resolver?: DS
    address_strategy?: string
    address_fallback_delay?: duration
    strategy?: strategy
    detour?: O
    client_subnet?: string
}
interface local<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'local'
}
interface hosts extends item_with_tag {
    type: 'hosts'
    /**
     * List of paths to hosts files.
     * @default /etc/hosts
     * @default C:\Windows\System32\Drivers\etc\hosts
     */
    path?: listable<string>
    /**
     * @example
     * ```json
     * {
     *   "www.google.com": "127.0.0.1",
     *   "localhost": ["127.0.0.1", "::1"]
     * }
     * ```
     */
    predefined?: Record<string, listable<string>>
}
interface tcp<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'tcp'
    server: string
    /**
     * @default 53
     */
    server_port?: number
}
interface udp<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'udp'
    server: string
    /**
     * @default 53
     */
    server_port?: number
}
interface tls<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'tls'
    server: string
    /**
     * @default 853
     */
    server_port?: number
    tls?: client_tls
}
interface quic<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'quic'
    server: string
    /**
     * @default 853
     */
    server_port?: number
    tls?: client_tls
}
interface https<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'https'
    server: string
    /**
     * @default 443
     */
    server_port?: number
    /**
     * @default /dns-query
     */
    path?: string
    headers?: headers
    tls?: client_tls
}
interface h3<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'h3'
    server: string
    /**
     * @default 443
     */
    server_port?: number
    /**
     * @default /dns-query
     */
    path?: string
    headers?: headers
    tls?: client_tls
}
interface dhcp<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'dhcp'
    interface?: string
}
interface fakeip extends item_with_tag {
    type: 'fakeip'
    /**
     * @example 198.18.0.0/15
     */
    inet4_range: string
    /**
     * @example fc00::/18
     */
    inet6_range: string
}
interface tailscale<O extends string = never> extends item_with_tag {
    type: 'tailscale'
    /**
     * The tag of the Tailscale endpoint.
     */
    endpoint: O
    /**
     * Indicates whether default DNS resolvers should be accepted for fallback queries in addition to MagicDNS.
     * if not enabled, NXDOMAIN will be returned for non-Tailscale domain queries.
     */
    accept_default_resolvers?: boolean
}
interface resolved<S extends string = never> extends item_with_tag {
    type: 'resolved'
    service: S
    accept_default_resolvers?: boolean
}

type rule<O extends string, I extends string, RS extends string, DS extends string> = rule_item<O, I, RS, DS> & action<DS>
type rule_item<O extends string, I extends string, RS extends string, DS extends string> = default_rule<O, I, RS> | logical_rule<O, I, RS, DS>
type action<DS extends string> = action_route<DS> | action_route_options | action_reject | action_predefined
interface action_route<DS extends string> extends resolver<DS> {
    action?: 'route'
}
interface action_route_options extends options {
    action: 'route-options'
}
interface action_predefined {
    action: 'predefined'
    /**
     * @default NOERROR
     */
    rcode?: 'NOERROR' | 'FORMERR' | 'SERVFAIL' | 'NXDOMAIN' | 'NOTIMP' | 'REFUSED'
    /**
     * @example localhost. IN A 127.0.0.1
     * @example localhost. IN AAAA ::1
     * @example localhost. IN TXT \"Hello\"
     */
    answer?: listable<string>
    ns?: listable<string>
    extra?: listable<string>
}
interface default_rule<O extends string, I extends string, RS extends string> extends default_rule_with_metadata<I, RS> {
    query_type?: listable<string | number>
    /**
     * @deprecated outbound rule items are deprecated and will be removed in sing-box 1.14.0
     * @since 1.12.0
     */
    outbound?: listable<O>
    rule_set_ip_cidr_accept_empty?: boolean
    ip_accept_any?: boolean
}
interface logical_rule<O extends string, I extends string, RS extends string, DS extends string> extends base_logical_rule {
    rules: rule<O, I, RS, DS>[]
}
