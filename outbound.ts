import type * as transport from './transport.ts'
import type { base_tls, duration, listable, network, shadowsocks_method, strategy } from './types.ts'

export type outbound =
    | direct
    | socks
    | http
    | shadowsocks
    | vmess
    | trojan
    | wireguard
    | hysteria
    | shadowtls
    | vless
    | tuic
    | hysteria2
    | tor
    | ssh
    | selector
    | urltest

export interface direct extends dialer {
    type: 'direct'
    tag: string
    override_address?: string
    override_port?: number
}
export interface socks extends dialer, server {
    type: 'socks'
    tag: string
    version?: '4' | '4a' | '5'
    username?: string
    password?: string
    network?: network
    udp_over_tcp?: udp_over_tcp
}
export interface http extends dialer, server {
    type: 'http'
    tag: string
    username?: string
    password?: string
    path?: string
    header?: Headers
    tls?: tls
}
export interface shadowsocks extends dialer, server {
    type: 'shadowsocks'
    tag: string
    method: shadowsocks_method
    password: string
    plugin?: 'obfs-local' | 'v2ray-plugin'
    plugin_opts?: string
    network?: network
    udp_over_tcp?: udp_over_tcp
    multiplex?: multiplex
}
export interface vmess extends dialer, server {
    type: 'vmess'
    tag: string
    uuid: string
    security?: 'auto' | 'none' | 'zero' | 'aes-128-gcm' | 'chacha20-poly1305'
    global_padding?: boolean
    authenticated_length?: boolean
    network?: network
    tls?: tls
    packet_encoding?: '' | 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport.transport
}
export interface trojan extends dialer, server {
    type: 'trojan'
    tag: string
    password: string
    network?: network
    tls?: tls
    multiplex?: multiplex
    transport?: transport.transport
}
export type wireguard = onepeer | multipeer
interface onepeer extends dialer, server {
    type: 'wireguard'
    tag: string
    system_interface?: boolean
    gso?: boolean
    interface_name?: string
    local_address: listable<string>
    private_key: string
    peer_public_key?: string
    pre_shared_key?: string
    reserved?: number[]
    workers?: number
    mtu?: number
    network?: network
}
interface multipeer extends dialer {
    type: 'wireguard'
    tag: string
    system_interface?: boolean
    gso?: boolean
    interface_name?: string
    local_address: listable<string>
    private_key: string
    peers?: peer[]
    workers?: number
    mtu?: number
    network?: network
}
interface peer extends server {
    public_key: string
    pre_shared_key?: string
    reserved?: number[]
    allowed_ips?: listable<string>
}
export interface hysteria extends dialer, server {
    type: 'hysteria'
    tag: string
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
    network?: network
    tls: tls
}
export interface shadowtls extends dialer, server {
    type: 'shadowtls'
    tag: string
    version?: 1 | 2 | 3
    password?: string
    tls: tls
}
export interface vless extends dialer, server {
    type: 'vless'
    tag: string
    uuid: string
    flow?: 'xtls-rprx-vision'
    network?: network
    tls?: tls
    packet_encoding?: '' | 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport.transport
}
export interface tuic extends dialer, server {
    type: 'tuic'
    tag: string
    uuid: string
    password?: string
    congestion_control?: 'cubic' | 'new_reno' | 'bbr'
    udp_relay_mode?: 'native' | 'quic'
    udp_over_stream?: boolean
    zero_rtt_handshake?: boolean
    heartbeat?: duration
    network?: network
    tls: tls
}
export interface hysteria2 extends dialer, server {
    type: 'hysteria2'
    tag: string
    up_mbps?: number
    down_mbps?: number
    obfs?: {
        type: 'salamander'
        password: string
    }
    password?: string
    network?: network
    tls: tls
    brutal_debug?: boolean
}
export interface tor extends dialer {
    type: 'tor'
    tag: string
    executable_path?: string
    extra_args?: string
    data_directory?: string
    torrc?: {
        [key: string]: string
    }
}
export interface ssh extends dialer, server {
    type: 'ssh'
    tag: string
    user?: string
    password?: string
    private_key?: listable<string>
    private_key_path?: string
    private_key_passphrase?: string
    host_key?: listable<string>
    host_key_algorithms?: listable<string>
    client_version?: string
}
export interface selector {
    type: 'selector'
    tag: string
    outbounds: string[]
    default?: string
    interrupt_exist_connections?: boolean
}
export interface urltest {
    type: 'urltest'
    tag: string
    outbounds: string[]
    url?: string
    interval?: duration
    tolerance?: number
    idle_timeout?: duration
    interrupt_exist_connections?: boolean
}

export interface dialer {
    detour?: string
    bind_interface?: string
    inet4_bind_address?: string
    inet6_bind_address?: string
    protect_path?: string
    routing_mark?: number
    reuse_addr?: boolean
    connect_timeout?: duration
    tcp_fast_open?: boolean
    tcp_multi_path?: boolean
    udp_fragment?: boolean
    domain_strategy?: strategy
    fallback_delay?: duration
}

export interface server {
    server: string
    server_port: number
}

interface tls extends base_tls {
    disable_sni?: boolean
    insecure?: boolean
    ech?: {
        enabled: true
        pq_signature_schemes_enabled?: boolean
        dynamic_record_sizing_disabled?: boolean
        config?: listable<string>
        config_path?: string
    }
    utls?: {
        enabled: true
        fingerprint?:
            | 'chrome'
            | 'firefox'
            | 'edge'
            | 'safari'
            | '360'
            | 'qq'
            | 'ios'
            | 'android'
            | 'random'
            | 'randomized'
    }
    reality?: {
        enabled: true
        public_key: string
        short_id: string
    }
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
