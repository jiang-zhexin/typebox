import type { base_rule, duration, listable, sniff_protocol, strategy } from './types.ts'

export interface dns {
    servers?: server[]
    rules?: rule[]
    final?: string
    reverse_mapping?: boolean
    fakeip?: fakeip
    strategy?: strategy
    disable_cache?: boolean
    disable_expire?: boolean
    independent_cache?: boolean
    client_subnet?: string
}

export interface fakeip {
    enabled: true
    inet4_range: string
    inet6_range: string
}

export interface server {
    tag: string
    address: string
    address_resolver?: string
    address_strategy?: string
    address_fallback_delay?: duration
    strategy?: strategy
    detour?: string
    client_subnet?: string
}

export type rule = default_rule | logical_rule
type default_rule = action & raw_default_rule
type logical_rule = action & raw_logical_rule
type action = route | route_options | reject
interface route {
    action?: 'route'
    server: string
}
interface route_options {
    action: 'route-options'
    disable_cache?: boolean
    rewrite_ttl?: number
    client_subnet?: string
}
interface reject {
    action: 'reject'
    method?: 'default' | 'drop'
    no_drop?: boolean
}
interface raw_default_rule extends base_rule {
    inbound?: listable<string>
    ip_version?: 4 | 6
    query_type?: listable<string | number>
    auth_user?: listable<string>
    protocol?: listable<sniff_protocol>
    ip_is_private?: boolean
    source_ip_is_private?: boolean
    user?: listable<string>
    user_id?: listable<number>
    outbound?: listable<string>
    clash_mode?: string
    rule_set?: listable<string>
    rule_set_ip_cidr_match_source?: boolean
    rule_set_ip_cidr_accept_empty?: boolean
    server?: string
    disable_cache?: boolean
    rewrite_ttl?: number
    client_subnet?: string
}
interface raw_logical_rule {
    type: 'logical'
    mode: 'and' | 'or'
    rules: rule[]
    invert?: boolean
}
