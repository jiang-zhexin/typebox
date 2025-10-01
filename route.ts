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
import type { duration, item_with_tag, listable, network_strategy, resolver, sniff_protocol } from './types.ts'

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
    const RS extends rule_set<OT[number] | string>,
    const OT extends readonly string[] = never,
>(rs: RS, _options?: {
    /**
     * @deprecated
     */
    assertExistOutbound?: OT
}): RS => rs

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
    const R extends rule<OT[number] | string, IT[number] | string, RS[number] | string, DS[number] | string>,
    const OT extends readonly string[] = never,
    const IT extends readonly string[] = never,
    const RS extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(r: R, _options?: {
    /**
     * @deprecated
     */
    assertExistOutbounds?: OT
    /**
     * @deprecated
     */
    assertExistInbounds?: IT
    /**
     * @deprecated
     */
    assertExistRuleSet?: RS
    /**
     * @deprecated
     */
    assertExistDnsServers?: DS
}): R => r

/**
 * You should not use this directly, instead use {@link createRuleSet} or {@link createRule}.
 */
export interface route<
    O extends string = never,
    I extends string = never,
    RS extends readonly rule_set<O>[] = never,
    DS extends string = never,
> {
    rules?: rule<O, I, RS[number]['tag'], DS>[]
    rule_set?: RS
    final?: O
    find_process?: boolean
    auto_detect_interface?: boolean
    override_android_vpn?: boolean
    default_interface?: string
    default_mark?: number
    default_domain_resolver?: DS | resolver<DS>
    default_network_strategy?: network_strategy
    default_fallback_delay?: duration
}

export declare namespace route {
    export { rule, rule_set }
}

type rule<O extends string = never, I extends string = never, RS extends string = never, DS extends string = never> = rule_item<O, I, RS, DS> & action<O, DS>
type rule_item<O extends string, I extends string, RS extends string, DS extends string> = default_rule<I, RS, O> | logical_rule<O, I, RS, DS>
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
interface default_rule<I extends string, RS extends string, O extends string> extends default_rule_with_metadata<I, RS> {
    client?: listable<quic_client>
    /**
     * Match specified outbounds' preferred routes.
     * Only support the tag of endpoint tailscale/wireguard now.
     */
    preferred_by?: listable<O>
}
interface logical_rule<O extends string, I extends string, RS extends string, DS extends string> extends base_logical_rule {
    rules: rule_item<O, I, RS, DS>[]
}

type rule_set<O extends string = never> = inline_rule_set | local_rule_set | remote_rule_set<O>
interface inline_rule_set extends item_with_tag {
    type: 'inline'
    rules: headless_rule[]
}

type rule_set_data_format = 'source' | 'binary'
interface outline_rule_set extends item_with_tag {
    format?: rule_set_data_format
}
interface local_rule_set extends outline_rule_set {
    type: 'local'
    path: string
}
interface remote_rule_set<O extends string> extends outline_rule_set {
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
