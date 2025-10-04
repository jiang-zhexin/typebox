/**
 * @module
 * The route field.
 *
 * @example
 * ```ts
 * import { createRuleSet, createRule } from "@zhexin/typebox/route"
 * ```
 */

import type { action_reject, base_default_rule, base_logical_rule, default_rule_with_metadata } from './rule.ts'
import type { duration, item_with_tag, listable, network_strategy, network_type, resolver, sniff_protocol } from './types.ts'

/**
 * @example
 * ```ts
 * const rule_set_block = createRuleSet({
 *     tag: 'block',
 *     type: 'remote',
 *     format: 'binary',
 *     url: '',
 *     download_detour: 'direct-out',
 * })
 * ```
 */
export const createRuleSet = <
    tag extends string,
    outbound_tag extends string = never,
>(rs: rule_set<tag, outbound_tag>): rule_set<tag, outbound_tag> => rs

/**
 * @example
 * ```ts
 * const rule_hijack_dns = createRule({
 *     port: 53,
 *     action: 'hijack-dns',
 * })
 * ```
 */
export const createRule = <
    outbound_tag extends string = never,
    inbound_tag extends string = never,
    rule_set_tag extends string = never,
    dns_server_tag extends string = never,
>(r: rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag>): rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag> => r

/**
 * You should not use this directly, instead use {@link createRuleSet} or {@link createRule}.
 */
export interface route<
    outbound_tag extends string,
    inbound_tag extends string,
    dns_server_tag extends string,
    RS extends rule_set<string, outbound_tag>,
> {
    rules?: rule<outbound_tag, inbound_tag, RS['tag'], dns_server_tag>[]
    rule_set?: RS[]
    final?: outbound_tag
    find_process?: boolean
    auto_detect_interface?: boolean
    override_android_vpn?: boolean
    default_interface?: string
    default_mark?: number
    default_domain_resolver?: dns_server_tag | resolver<dns_server_tag>
    default_network_strategy?: network_strategy
    default_network_type?: listable<network_type>
    default_fallback_network_type?: listable<network_type>
    default_fallback_delay?: duration
}

export declare namespace route {
    export { rule, rule_set }
}

type rule<O extends string, I extends string, RS extends string, DS extends string> = rule_item<O, I, RS, DS> & action<O, DS>
type rule_item<O extends string, I extends string, RS extends string, DS extends string> = default_rule<I, RS> | logical_rule<O, I, RS, DS>
type action<O extends string, DS extends string> = action_route<O> | action_route_options | action_reject | action_dns | action_sniff | action_resolve<DS>
interface action_route<O extends string> extends options {
    action?: 'route'
    outbound: O
}
interface action_route_options extends options {
    action: 'route-options'
}
interface options {
    override_address?: string
    override_port?: number
    network_strategy?: network_strategy
    fallback_delay?: duration
    udp_disable_domain_unmapping?: boolean
    udp_connect?: boolean
    udp_timeout?: duration
    /**
     * Conflict with `tls_record_fragment`.
     */
    tls_fragment?: boolean
    tls_fragment_fallback_delay?: duration
    /**
     * Conflict with `tls_fragment`.
     */
    tls_record_fragment?: boolean
}
interface action_dns {
    action: 'hijack-dns'
}
interface action_sniff {
    action: 'sniff'
    sniffer?: listable<sniff_protocol>
    timeout?: duration
}
interface action_resolve<DS extends string> extends Partial<resolver<DS>> {
    action: 'resolve'
}
interface default_rule<I extends string, RS extends string> extends default_rule_with_metadata<I, RS> {
    client?: listable<quic_client>
}
interface logical_rule<O extends string, I extends string, RS extends string, DS extends string> extends base_logical_rule {
    rules: rule_item<O, I, RS, DS>[]
}

type rule_set<T extends string, O extends string> = inline_rule_set<T> | local_rule_set<T> | remote_rule_set<T, O>
interface inline_rule_set<T extends string> extends item_with_tag<T> {
    type: 'inline'
    rules: headless_rule[]
}

type rule_set_data_format = 'source' | 'binary'
interface outline_rule_set<T extends string> extends item_with_tag<T> {
    format?: rule_set_data_format
}
interface local_rule_set<T extends string> extends outline_rule_set<T> {
    type: 'local'
    path: string
}
interface remote_rule_set<T extends string, O extends string> extends outline_rule_set<T> {
    type: 'remote'
    url: string
    download_detour?: O
    update_interval?: duration
}

type headless_rule = default_headless_rule | logical_headless_rule
interface default_headless_rule extends base_default_rule {
    query_type?: listable<string | number>
}
interface logical_headless_rule extends base_logical_rule {
    rules: headless_rule[]
}

type quic_client = 'chrimium' | 'safari' | 'firefox' | 'quic-go'
