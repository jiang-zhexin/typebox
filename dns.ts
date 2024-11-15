import type { action_reject, base_logical_rule, default_rule_with_metadata } from './rule.ts'
import type { duration, item_with_tag, listable, strategy } from './types.ts'

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
    cache_capacity?: number
    client_subnet?: string
}

export declare namespace dns {
    export { fakeip, rule, server }
}

interface fakeip {
    enabled: true
    inet4_range: string
    inet6_range: string
}

interface server extends item_with_tag {
    address: string
    address_resolver?: string
    address_strategy?: string
    address_fallback_delay?: duration
    strategy?: strategy
    detour?: string
    client_subnet?: string
}

type rule = rule_item & action
type rule_item = default_rule | logical_rule
type action = action_route | action_route_options | action_reject
interface action_route {
    action?: 'route'
    server: string
    disable_cache?: boolean
    rewrite_ttl?: number
    client_subnet?: string
}
interface action_route_options {
    action: 'route-options'
    disable_cache?: boolean
    rewrite_ttl?: number
    client_subnet?: string
}
interface default_rule extends default_rule_with_metadata {
    query_type?: listable<string | number>
    outbound?: listable<string>
}
interface logical_rule extends base_logical_rule {
    rules: rule[]
}
