export type listable<T> = T | T[]

export type unit = 'd' | 'h' | 'm' | 's' | 'ms' | 'us' | 'ns'
export type duration = `${number}${unit}`
export type headers = { [key: string]: string }
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
export type cipher_suites =
    | 'TLS_RSA_WITH_AES_128_CBC_SHA'
    | 'TLS_RSA_WITH_AES_256_CBC_SHA'
    | 'TLS_RSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_RSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_AES_128_GCM_SHA256'
    | 'TLS_AES_256_GCM_SHA384'
    | 'TLS_CHACHA20_POLY1305_SHA256'
    | 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA'
    | 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA'
    | 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA'
    | 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'
    | 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
    | 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256'
export type tls_version = '1.0' | '1.1' | '1.2' | '1.3'
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
export type network = 'tcp' | 'udp'
export type quic_client = 'chrimium' | 'safari' | 'firefox' | 'quic-go'

export interface base_tls {
    enabled: true
    server_name?: string
    alpn?: listable<string>
    min_version?: tls_version
    max_version?: tls_version
    cipher_suites?: listable<cipher_suites>
    certificate?: listable<string>
    certificate_path?: string
}

export interface base_rule {
    network?: listable<network>
    domain?: listable<string>
    domain_suffix?: listable<string>
    domain_keyword?: listable<string>
    domain_regex?: listable<string>
    source_ip_cidr?: listable<string>
    ip_cidr?: listable<string>
    source_port?: listable<number>
    source_port_range?: listable<string>
    port?: listable<number>
    port_range?: listable<string>
    process_name?: listable<string>
    process_path?: listable<string>
    process_path_regex?: listable<string>
    package_name?: listable<string>
    wifi_ssid?: listable<string>
    wifi_bssid?: listable<string>
    invert?: boolean
}
