import type { dialer, duration, headers, item_with_tag, listable, network, server, shadowsocks_method } from './types.ts'
import type { transport } from './transport.ts'
import type { client_tls as tls } from './tls.ts'

export type outbound =
    | direct
    | socks
    | http
    | shadowsocks
    | vmess
    | trojan
    | hysteria
    | shadowtls
    | vless
    | tuic
    | hysteria2
    | tor
    | ssh
    | selector
    | urltest

export declare namespace outbound {
    export { direct, http, hysteria, hysteria2, selector, shadowsocks, shadowtls, socks, ssh, tls, tor, trojan, tuic, urltest, vless, vmess }
}

interface remote extends dialer, item_with_tag {
    network?: network
}

interface direct extends dialer {
    type: 'direct'
    tag: string
}
interface socks extends remote, server {
    type: 'socks'
    version?: '4' | '4a' | '5'
    username?: string
    password?: string
    udp_over_tcp?: udp_over_tcp
}
interface http extends dialer, server, item_with_tag {
    type: 'http'
    username?: string
    password?: string
    path?: string
    header?: headers
    tls?: tls
}
interface shadowsocks extends remote, server {
    type: 'shadowsocks'
    method: shadowsocks_method
    password: string
    plugin?: 'obfs-local' | 'v2ray-plugin'
    plugin_opts?: string
    network?: network
    udp_over_tcp?: udp_over_tcp
    multiplex?: multiplex
}
interface vmess extends remote, server {
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
interface trojan extends remote, server {
    type: 'trojan'
    password: string
    tls?: tls
    multiplex?: multiplex
    transport?: transport
}
interface hysteria extends remote, server {
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
interface shadowtls extends dialer, server, item_with_tag {
    type: 'shadowtls'
    version?: 1 | 2 | 3
    password?: string
    tls: tls
}
interface vless extends remote, server {
    type: 'vless'
    uuid: string
    flow?: 'xtls-rprx-vision'
    tls?: tls
    packet_encoding?: 'packetaddr' | 'xudp'
    multiplex?: multiplex
    transport?: transport
}
interface tuic extends remote, server {
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
interface hysteria2 extends remote, server {
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
interface tor extends dialer, item_with_tag {
    type: 'tor'
    executable_path?: string
    extra_args?: string
    data_directory?: string
    torrc?: {
        [key: string]: string
    }
}
interface ssh extends dialer, server, item_with_tag {
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
interface group_outbound extends item_with_tag {
    outbounds: string[]
    interrupt_exist_connections?: boolean
}
interface selector extends group_outbound {
    type: 'selector'
    default?: string
}
interface urltest extends group_outbound {
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

type masquerade = masquerade.file | masquerade.proxy | masquerade.http
declare namespace masquerade {
    export interface file {
        type: 'file'
        directory: string
    }
    export interface proxy {
        type: 'proxy'
        url: string
        rewrite_host?: boolean
    }
    export interface http {
        type: 'string'
        status_code?: number
        headers?: headers
        content: string
    }
}
