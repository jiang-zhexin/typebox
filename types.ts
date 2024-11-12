export type listable<T> = T | T[]
export interface item_with_tag {
    tag: string
}

type can_empty<T extends string> = '' | T
type non_empty<T extends string> = T extends '' ? never : T
type empty_join<list extends string[]> = list extends [infer first extends string, ...infer rest extends string[]] ? `${can_empty<first>}${empty_join<rest>}` : ''
export type duration = non_empty<empty_join<[
    `${number}d`,
    `${number}h`,
    `${number}m`,
    `${number}s`,
    `${number}ms`,
    `${number}us`,
    `${number}ns`,
]>>
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
