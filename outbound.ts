/**
 * @module
 * The outbounds field.
 *
 * @example
 * ```ts
 * import { createOutbound, createOutbounds } from "@zhexin/typebox/outbound"
 * ```
 */

import type { dialer, duration, headers, item_with_tag, listable, network, server, shadowsocks_method } from './types.ts'
import type { transport } from './transport.ts'
import type { client_tls as tls } from './tls.ts'

/**
 * @example
 * ```ts
 * const a = createOutbound({
 *     tag: 'a',
 *     type: 'direct',
 *     detour: 'b',
 *     domain_resolver: 'c',
 * }, {
 *     assertExistOutbounds: ['b'], // Now you can use 'b' in detour
 *     assertExistDnsServers: ['c'], // Now you can use 'c' in domain_resolver
 * })
 * ```
 */
export const createOutbound = <
    const O extends outbound<OT[number], DS[number]>,
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(outbound: O, _options?: {
    assertExistOutbounds?: OT
    assertExistDnsServers?: DS
}): O => outbound

/**
 * @example
 * ```ts
 * const myoutbounds = createOutbounds([
 *     {
 *         tag: 'a',
 *         type: 'direct',
 *     },
 *     {
 *         type: 'selector',
 *         tag: 'b',
 *         outbounds: ['a'],
 *     },
 * ])
 * ```
 */
export const createOutbounds = <
    const O extends readonly outbound<O[number]['tag'] | OT[number], DS[number]>[],
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(outbounds: O, _options?: {
    assertExistOutbounds?: OT
    assertExistDnsServers?: DS
}): O => outbounds

/**
 * You should not use this directly, instead use {@link createOutbound} or {@link createOutbounds}.
 */
export type outbound<O extends string = never, DS extends string = never> =
    | direct<O, DS>
    | block
    | socks<O, DS>
    | http<O, DS>
    | shadowsocks<O, DS>
    | vmess<O, DS>
    | trojan<O, DS>
    | hysteria<O, DS>
    | shadowtls<O, DS>
    | vless<O, DS>
    | tuic<O, DS>
    | hysteria2<O, DS>
    | anytls<O, DS>
    | tor<O, DS>
    | ssh<O, DS>
    | selector<O>
    | urltest<O>

interface remote<O extends string, DS extends string> extends dialer<O, DS>, item_with_tag {
    network?: network
}

interface direct<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'direct'
}
interface block extends item_with_tag {
    type: 'block'
}
interface socks<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'socks'
    version?: '4' | '4a' | '5'
    username?: string
    password?: string
    udp_over_tcp?: udp_over_tcp
}
interface http<O extends string = never, DS extends string = never> extends dialer<O, DS>, server, item_with_tag {
    type: 'http'
    username?: string
    password?: string
    path?: string
    header?: headers
    tls?: tls
}
interface shadowsocks<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'shadowsocks'
    method: shadowsocks_method
    password: string
    plugin?: 'obfs-local' | 'v2ray-plugin'
    plugin_opts?: string
    network?: network
    udp_over_tcp?: udp_over_tcp
    multiplex?: multiplex
}
interface vmess<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'vmess'
    uuid: string
    security?: 'auto' | 'none' | 'zero' | 'aes-128-gcm' | 'chacha20-poly1305'
    global_padding?: boolean
    authenticated_length?: boolean
    tls?: tls
    packet_encoding?: 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport
}
interface trojan<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'trojan'
    password: string
    tls?: tls
    multiplex?: multiplex
    transport?: transport
}
interface hysteria<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'hysteria'
    up: string
    up_mbps: number
    down: string
    down_mbps: number
    obfs?: string
    auth?: string
    auth_str?: string
    recv_window_conn?: number
    recv_window?: number
    disable_mtu_discovery?: boolean
    tls: tls
}
interface shadowtls<O extends string = never, DS extends string = never> extends dialer<O, DS>, server, item_with_tag {
    type: 'shadowtls'
    version?: 1 | 2 | 3
    password?: string
    tls: tls
}
interface vless<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'vless'
    uuid: string
    flow?: 'xtls-rprx-vision'
    tls?: tls
    packet_encoding?: 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport
}
interface tuic<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'tuic'
    uuid: string
    password?: string
    congestion_control?: 'cubic' | 'new_reno' | 'bbr'
    udp_relay_mode?: 'native' | 'quic'
    udp_over_stream?: boolean
    zero_rtt_handshake?: boolean
    heartbeat?: duration
    tls: tls
}
interface hysteria2<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    type: 'hysteria2'
    server_ports?: listable<string>
    hop_interval?: duration
    up_mbps?: number
    down_mbps?: number
    obfs?: {
        type: 'salamander'
        password: string
    }
    password?: string
    tls: tls
    brutal_debug?: boolean
    masquerade?: string | masquerade
}
interface anytls<O extends string = never, DS extends string = never> extends remote<O, DS>, server {
    password: string
    /**
     * Interval checking for idle sessions.
     * @default 30s
     */
    idle_session_check_interval?: duration
    /**
     * In the check, close sessions that have been idle for longer than this.
     * @default 30s
     */
    idle_session_timeout?: duration
    tls?: tls
}
interface tor<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
    type: 'tor'
    executable_path?: string
    extra_args?: string
    data_directory?: string
    torrc?: {
        [key: string]: string
    }
}
interface ssh<O extends string = never, DS extends string = never> extends dialer<O, DS>, server, item_with_tag {
    type: 'ssh'
    user?: string
    password?: string
    private_key?: listable<string>
    private_key_path?: string
    private_key_passphrase?: string
    host_key?: listable<string>
    host_key_algorithms?: listable<string>
    client_version?: string
}
interface group_outbound<O extends string = never> extends item_with_tag {
    outbounds: O[]
    interrupt_exist_connections?: boolean
}
interface selector<O extends string = never> extends group_outbound<O> {
    type: 'selector'
    default?: O
}
interface urltest<O extends string = never> extends group_outbound<O> {
    type: 'urltest'
    url?: string
    interval?: duration
    tolerance?: number
    idle_timeout?: duration
}

interface multiplex {
    enabled: true
    padding?: number
    protocol?: 'smux' | 'yamux' | 'h2mux'
    max_connections?: number
    min_streams?: number
    max_streams?: number
    brutal?: {
        enabled: true
        up_mbps: number
        down_mbps: number
    }
}

interface udp_over_tcp {
    enabled: true
    version: 1 | 2
}

type masquerade = masquerade_file | masquerade_proxy | masquerade_http
interface masquerade_file {
    type: 'file'
    directory: string
}
interface masquerade_proxy {
    type: 'proxy'
    url: string
    rewrite_host?: boolean
}
interface masquerade_http {
    type: 'string'
    status_code?: number
    headers?: headers
    content: string
}
