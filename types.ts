export type listable<T> = T | T[]
export interface item_with_tag {
    tag: string
}
export type headers = Record<string, listable<string>>

type can_empty<T extends string> = '' | T
type non_empty<T extends string> = T extends '' ? never : T
type empty_join<L extends string[]> = L extends [infer F extends string, ...infer R extends string[]] ? `${can_empty<F>}${empty_join<R>}` : ''
export type duration = non_empty<
    empty_join<[
        `${number}d`,
        `${number}h`,
        `${number}m`,
        `${number}s`,
        `${number}ms`,
        `${number}us`,
        `${number}ns`,
    ]>
>
export type strategy =
    | 'prefer_ipv4'
    | 'prefer_ipv6'
    | 'ipv4_only'
    | 'ipv6_only'
export type shadowsocks_method =
    | '2022-blake3-aes-128-gcm'
    | '2022-blake3-aes-256-gcm'
    | '2022-blake3-chacha20-poly1305'
    | 'none'
    | 'aes-128-gcm'
    | 'aes-192-gcm'
    | 'aes-256-gcm'
    | 'chacha20-ietf-poly1305'
    | 'xchacha20-ietf-poly1305'
export type sniff_protocol =
    | 'http'
    | 'tls'
    | 'quic'
    | 'stun'
    | 'dns'
    | 'bittorrent'
    | 'dtls'
    | 'ssh'
    | 'rdp'

export type network_strategy = 'default' | 'fallback' | 'hybrid' | 'wifi' | 'cellular' | 'ethernet' | 'wifi_only' | 'cellular_only' | 'ethernet_only'
export type network = 'tcp' | 'udp'

export interface dialer<O extends string = never, DS extends string = never> {
    detour?: O
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
    domain_resolver?: DS | resolver<DS>
    network_strategy?: network_strategy
    fallback_delay?: duration
    network_fallback_delay?: duration
    /**
     * @deprecated domain_strategy is merged to domain_resolver in sing-box 1.12.0
     * @since 1.12.0
     */
    domain_strategy?: strategy
}

export interface options {
    disable_cache?: boolean
    rewrite_ttl?: number
    client_subnet?: string
}

export interface resolver<DS extends string> extends options {
    server: DS
    strategy?: strategy
}

export interface server {
    server: string
    server_port: number
}
