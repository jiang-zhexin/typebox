import type { base_rule, duration, listable, quic_client, sniff_protocol, strategy } from './types.ts'

export interface route {
    rules?: rule[]
    rule_set?: rule_set[]
    final?: string
    find_process?: string
    auto_detect_interface?: boolean
    override_android_vpn?: boolean
    default_interface?: string
    default_mark?: number
}

export type rule = default_rule | logical_rule
type default_rule = action & raw_default_rule
type logical_rule = action & raw_logical_rule
type action = default_action | route_options | reject | dns | sniff | resolve
interface default_action {
    action?: 'route'
    outbound: string
}
interface route_options {
    action: 'route-options'
    udp_disable_domain_unmapping?: boolean
    udp_connect?: boolean
}
interface reject {
    action: 'reject'
    method?: 'default' | 'drop'
    no_drop?: boolean
}
interface dns {
    action: 'hijack-dns'
}
interface sniff {
    action: 'sniff'
    sniffer?: sniff_protocol[]
    timeout?: duration
}
interface resolve {
    action: 'resolve'
    strategy?: strategy
    server?: string
}
interface raw_default_rule extends base_rule {
    inbound?: listable<string>
    ip_version?: 4 | 6
    auth_user?: listable<string>
    protocol?: listable<sniff_protocol>
    client?: listable<quic_client>
    ip_is_private?: boolean
    source_ip_is_private?: boolean
    user?: listable<string>
    user_id?: listable<number>
    clash_mode?: string
    rule_set?: listable<string>
    rule_set_ip_cidr_match_source?: boolean
    outbound: string
}
interface raw_logical_rule {
    type: 'logical'
    mode: 'and' | 'or'
    rules: rule[]
    invert?: boolean
}

export type rule_set = inline_rule_set | local_rule_set | remote_rule_set
interface inline_rule_set {
    type: 'inline'
    tag: string
    rules: headless_rule[]
}
interface local_rule_set {
    type: 'local'
    tag: string
    format: 'source' | 'binary'
    path: string
}
interface remote_rule_set {
    type: 'remote'
    tag: string
    format: 'source' | 'binary'
    url: string
    download_detour?: string
    update_interval?: duration
}

export type headless_rule = default_headless_rule | logical_headless_rule
interface default_headless_rule extends base_rule {
    query_type?: listable<string | number>
}
interface logical_headless_rule {
    type: 'logical'
    mode: 'and' | 'or'
    rules: headless_rule[]
    invert?: boolean
}
