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
 * })
 * ```
 */
export const createOutbound = <
    tag extends string,
    outbound_tag extends string = never,
    dns_server_tag extends string = never,
>(outbound: outbound<tag, outbound_tag, dns_server_tag>): outbound<tag, outbound_tag, dns_server_tag> => outbound

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
    tag extends string,
    dns_serever_tag extends string,
    O extends outbound<tag, O['tag'], dns_serever_tag>,
>(outbounds: O[]): O[] => outbounds

/**
 * You should not use this directly, instead use {@link createOutbound} or {@link createOutbounds}.
 */
export type outbound<tag extends string, outbound_tag extends string, dns_server_tag extends string> =
    | direct<tag, outbound_tag, dns_server_tag>
    | block<tag>
    | socks<tag, outbound_tag, dns_server_tag>
    | http<tag, outbound_tag, dns_server_tag>
    | shadowsocks<tag, outbound_tag, dns_server_tag>
    | vmess<tag, outbound_tag, dns_server_tag>
    | trojan<tag, outbound_tag, dns_server_tag>
    | naive<tag, outbound_tag, dns_server_tag>
    | hysteria<tag, outbound_tag, dns_server_tag>
    | shadowtls<tag, outbound_tag, dns_server_tag>
    | vless<tag, outbound_tag, dns_server_tag>
    | tuic<tag, outbound_tag, dns_server_tag>
    | hysteria2<tag, outbound_tag, dns_server_tag>
    | anytls<tag, outbound_tag, dns_server_tag>
    | tor<tag, outbound_tag, dns_server_tag>
    | ssh<tag, outbound_tag, dns_server_tag>
    | selector<tag, outbound_tag>
    | urltest<tag, outbound_tag>

interface remote<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    network?: network
}

interface direct<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'direct'
}
interface block<T extends string> extends item_with_tag<T> {
    type: 'block'
}
interface socks<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'socks'
    version?: '4' | '4a' | '5'
    username?: string
    password?: string
    udp_over_tcp?: udp_over_tcp
}
interface http<T extends string, O extends string, DS extends string> extends dialer<O, DS>, server, item_with_tag<T> {
    type: 'http'
    username?: string
    password?: string
    path?: string
    header?: headers
    tls?: tls
}
interface shadowsocks<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'shadowsocks'
    method: shadowsocks_method
    password: string
    plugin?: 'obfs-local' | 'v2ray-plugin'
    plugin_opts?: string
    network?: network
    udp_over_tcp?: udp_over_tcp
    multiplex?: multiplex
}
interface vmess<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
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
interface trojan<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'trojan'
    password: string
    tls?: tls
    multiplex?: multiplex
    transport?: transport
}
interface naive<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'naive'
    username?: string
    password?: string
    insecure_concurrency?: number
    extra_headers: headers
    tls: tls
}
interface hysteria<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
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
interface shadowtls<T extends string, O extends string, DS extends string> extends dialer<O, DS>, server, item_with_tag<T> {
    type: 'shadowtls'
    version?: 1 | 2 | 3
    password?: string
    tls: tls
}
interface vless<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'vless'
    uuid: string
    flow?: 'xtls-rprx-vision'
    tls?: tls
    packet_encoding?: 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport
}
interface tuic<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
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
interface hysteria2<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
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
interface anytls<T extends string, O extends string, DS extends string> extends remote<T, O, DS>, server {
    type: 'anytls'
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
    /**
     * In the check, at least the first n idle sessions are kept open.
     * @default 0
     */
    min_idle_session?: number
    tls?: tls
}
interface tor<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'tor'
    executable_path?: string
    extra_args?: string
    data_directory?: string
    torrc?: {
        [key: string]: string
    }
}
interface ssh<T extends string, O extends string, DS extends string> extends dialer<O, DS>, server, item_with_tag<T> {
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
interface group_outbound<T extends string, O extends string> extends item_with_tag<T> {
    outbounds: O[]
    interrupt_exist_connections?: boolean
}
interface selector<T extends string, O extends string> extends group_outbound<T, O> {
    type: 'selector'
    default?: O
}
interface urltest<T extends string, O extends string> extends group_outbound<T, O> {
    type: 'urltest'
    url?: string
    interval?: duration
    tolerance?: number
    idle_timeout?: duration
}

interface multiplex {
    enabled: true
    padding?: boolean
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
