import type { action_reject, base_action_route, base_action_route_options, base_default_rule, base_logical_rule, default_rule_with_metadata } from './rule.ts'
import type { duration, item_with_tag, listable, sniff_protocol, strategy } from './types.ts'

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

export declare namespace route {
    export { rule, rule_set }
}

type rule = rule_item & action
type rule_item = default_rule | logical_rule
type action = action_route | action_route_options | action_reject | action_dns | action_sniff | action_resolve
interface action_route extends base_action_route {
    outbound: string
    udp_disable_domain_unmapping?: boolean
    udp_connect?: boolean
}
interface action_route_options extends base_action_route_options {
    udp_disable_domain_unmapping?: boolean
    udp_connect?: boolean
}
interface action_dns {
    action: 'hijack-dns'
}
interface action_sniff {
    action: 'sniff'
    sniffer?: listable<sniff_protocol>
    timeout?: duration
}
interface action_resolve {
    action: 'resolve'
    strategy?: strategy
    server?: string
}
interface default_rule extends default_rule_with_metadata {
    client?: listable<quic_client>
}
interface logical_rule extends base_logical_rule {
    rules: rule[]
}

type rule_set = inline_rule_set | local_rule_set | remote_rule_set
interface inline_rule_set extends item_with_tag {
    type: 'inline'
    rules: headless_rule[]
}

type rule_set_data_format = 'source' | 'binary'
interface outline_rule_set extends item_with_tag {
    format: rule_set_data_format
}
interface local_rule_set extends outline_rule_set {
    type: 'local'
    path: string
}
interface remote_rule_set extends outline_rule_set {
    type: 'remote'
    url: string
    download_detour?: string
    update_interval?: duration
}

type headless_rule = default_headless_rule | logical_headless_rule
interface default_headless_rule extends base_default_rule {
    query_type?: listable<string | number>
}
interface logical_headless_rule extends base_logical_rule {
    rules: headless_rule[]
}

type quic_client = Lowercase<'chrimium' | 'safari' | 'firefox' | 'quic-go'>
