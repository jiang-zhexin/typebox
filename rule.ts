import type { listable, network, sniff_protocol } from './types.ts'

interface rule {
    invert?: boolean
}

export interface base_default_rule extends rule {
    type?: 'default'
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
    network_type?: listable<network_type>
    network_is_expensive?: boolean
    network_is_constrained?: boolean
}

export interface base_logical_rule extends rule {
    type: 'logical'
    mode: 'and' | 'or'
}

export interface default_rule_with_metadata<I extends string, RS extends string> extends base_default_rule {
    inbound?: listable<I>
    ip_version?: 4 | 6
    auth_user?: listable<string>
    protocol?: listable<sniff_protocol>
    ip_is_private?: boolean
    source_ip_is_private?: boolean
    user?: listable<string>
    user_id?: listable<number>
    clash_mode?: string
    rule_set?: listable<RS>
    rule_set_ip_cidr_match_source?: boolean
}

export interface action_reject {
    action: 'reject'
    method?: 'default' | 'drop'
    no_drop?: boolean
}

type network_type = 'wifi' | 'cellular' | 'ethernet' | 'other'
