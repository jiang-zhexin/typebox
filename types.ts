export type listable<T> = T | T[]
export interface item_with_tag {
    tag: string
}
 
type non_empty_string<T extends string> = T extends '' ? never : T
type can_empty_string<T extends string> = '' | T
type d = can_empty_string<`${number}d`>
type h = can_empty_string<`${number}h`>
type m = can_empty_string<`${number}m`>
type s = can_empty_string<`${number}s`>
type ms = can_empty_string<`${number}ms`>
type us = can_empty_string<`${number}us`>
type ns = can_empty_string<`${number}ns`>
export type duration = non_empty_string<`${d}${h}${m}${s}${ms}${us}${ns}`>
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
export type sniff_protocol = Lowercase<
    | 'http'
    | 'tls'
    | 'quic'
    | 'stun'
    | 'dns'
    | 'bittorrent'
    | 'dtls'
    | 'ssh'
    | 'rdp'
>
export type network = Lowercase<'tcp' | 'udp'>
