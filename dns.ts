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
 * })
 * ```
 */
export const createDnsServer = <
    tag extends string,
    dns_server_tag extends string = never,
    outbound_tag extends string = never,
    service_tag extends string = never,
>(server: dns.server<tag, outbound_tag, service_tag, dns_server_tag>): dns.server<tag, outbound_tag, service_tag, dns_server_tag> => server

export const createDnsServers = <
    tag extends string,
    outbound_tag extends string,
    service_tag extends string,
    DS extends dns.server<tag, outbound_tag, service_tag, DS['tag']>,
>(server: DS[]): DS[] => server

export const createDnsRule = <
    dns_server_tag extends string = never,
    outbound_tag extends string = never,
    inbound_tag extends string = never,
    rule_set_tag extends string = never,
>(r: rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag>): rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag> => r

/**
 * You should not use this directly, instead use {@link createDnsServer} or {@link createDnsRule}.
 */
export interface dns<
    outbound_tag extends string,
    inbound_tag extends string,
    service_tag extends string,
    rule_set_tag extends string,
    DS extends dns.server<string, outbound_tag, service_tag, DS['tag']>,
> {
    servers?: DS[]
    rules?: rule<outbound_tag | 'any', inbound_tag, rule_set_tag, DS['tag']>[]
    final?: DS['tag']
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
    export type server<tag extends string, outbound_tag extends string, service_tag extends string, dns_server_tag extends string> =
        | legacy<tag, outbound_tag, dns_server_tag>
        | local<tag, outbound_tag, dns_server_tag>
        | hosts<tag>
        | tcp<tag, outbound_tag, dns_server_tag>
        | udp<tag, outbound_tag, dns_server_tag>
        | tls<tag, outbound_tag, dns_server_tag>
        | quic<tag, outbound_tag, dns_server_tag>
        | https<tag, outbound_tag, dns_server_tag>
        | h3<tag, outbound_tag, dns_server_tag>
        | dhcp<tag, outbound_tag, dns_server_tag>
        | fakeip<tag>
        | tailscale<tag, outbound_tag>
        | resolved<tag, service_tag>
    export { rule }
}
/**
 * @deprecated Legacy DNS servers is deprecated and will be removed in sing-box 1.14.0
 * @since 1.12.0
 */
interface legacy<T extends string, O extends string, DS extends string> extends item_with_tag<T> {
    address: string
    address_resolver?: DS
    address_strategy?: string
    address_fallback_delay?: duration
    strategy?: strategy
    detour?: O
    client_subnet?: string
}
interface local<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'local'
}
interface hosts<T extends string> extends item_with_tag<T> {
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
interface tcp<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'tcp'
    server: string
    /**
     * @default 53
     */
    server_port?: number
}
interface udp<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'udp'
    server: string
    /**
     * @default 53
     */
    server_port?: number
}
interface tls<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'tls'
    server: string
    /**
     * @default 853
     */
    server_port?: number
    tls?: client_tls
}
interface quic<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'quic'
    server: string
    /**
     * @default 853
     */
    server_port?: number
    tls?: client_tls
}
interface https<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
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
interface h3<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
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
interface dhcp<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'dhcp'
    interface?: string
}
interface fakeip<T extends string> extends item_with_tag<T> {
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
interface tailscale<T extends string, O extends string> extends item_with_tag<T> {
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
interface resolved<T extends string, S extends string> extends item_with_tag<T> {
    type: 'resolved'
    service: S
    accept_default_resolvers?: boolean
}

type rule<
    O extends string,
    I extends string,
    RS extends string,
    DS extends string,
> = rule_item<O, I, RS, DS> & action<DS>
type rule_item<
    O extends string,
    I extends string,
    RS extends string,
    DS extends string,
> = default_rule<O, I, RS> | logical_rule<O, I, RS, DS>
type action<DS extends string> =
    | action_route<DS>
    | action_route_options
    | action_reject
    | action_predefined
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
    rcode?:
        | 'NOERROR'
        | 'FORMERR'
        | 'SERVFAIL'
        | 'NXDOMAIN'
        | 'NOTIMP'
        | 'REFUSED'
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
interface logical_rule<
    O extends string,
    I extends string,
    RS extends string,
    DS extends string,
> extends base_logical_rule {
    rules: rule_item<O, I, RS, DS>[]
}
