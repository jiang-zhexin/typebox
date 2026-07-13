/**
 * @module
 * The route field.
 *
 * @example
 * ```ts
 * import { createRuleSet, createRule } from "@zhexin/typebox/route"
 * ```
 */

import type { headless_http_client } from "./http_client.ts";
import type {
  action_reject,
  base_logical_rule,
  default_rule_with_metadata,
} from "./rule.ts";
import type { headless_rule } from "./rule_set.ts";
import type {
  duration,
  item_with_tag,
  listable,
  network_strategy,
  network_type,
  resolver,
  sniff_protocol,
} from "./types.ts";

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
export function createRuleSet<
  tag extends string,
  outbound_tag extends string = never,
  http_client_tag extends string = never,
  dns_server_tag extends string = never,
>(
  rs: rule_set<tag, outbound_tag, http_client_tag, dns_server_tag>,
): rule_set<tag, outbound_tag, http_client_tag, dns_server_tag> {
  return rs;
}

/**
 * @example
 * ```ts
 * const rule_hijack_dns = createRule({
 *     port: 53,
 *     action: 'hijack-dns',
 * })
 * ```
 */
export function createRule<
  outbound_tag extends string = never,
  inbound_tag extends string = never,
  rule_set_tag extends string = never,
  dns_server_tag extends string = never,
>(
  r: rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag>,
): rule<outbound_tag, inbound_tag, rule_set_tag, dns_server_tag> {
  return r;
}

/**
 * You should not use this directly, instead use {@link createRuleSet} or {@link createRule}.
 */
export interface route<
  outbound_tag extends string,
  inbound_tag extends string,
  dns_server_tag extends string,
  http_client_tag extends string,
  RS extends rule_set<string, outbound_tag, http_client_tag, dns_server_tag>,
> {
  rules?: rule<outbound_tag, inbound_tag, RS["tag"], dns_server_tag>[];
  rule_set?: RS[];
  default_http_client?: http_client_tag;
  final?: outbound_tag;
  find_process?: boolean;
  find_neighbor?: boolean;
  dhcp_lease_files?: listable<string>;
  auto_detect_interface?: boolean;
  override_android_vpn?: boolean;
  default_interface?: string;
  default_mark?: number;
  default_domain_resolver?: dns_server_tag | resolver<dns_server_tag>;
  default_network_strategy?: network_strategy;
  default_network_type?: listable<network_type>;
  default_fallback_network_type?: listable<network_type>;
  default_fallback_delay?: duration;
}

export declare namespace route {
  export { rule, rule_set };
}

type rule<
  O extends string,
  I extends string,
  RS extends string,
  DS extends string,
> = rule_item<O, I, RS, DS> & action<O, DS>;
type rule_item<
  O extends string,
  I extends string,
  RS extends string,
  DS extends string,
> = default_rule<I, RS, O> | logical_rule<O, I, RS, DS>;
type action<O extends string, DS extends string> =
  | action_route<O>
  | action_bypass<O>
  | action_reject
  | action_dns
  | action_route_options
  | action_sniff
  | action_resolve<DS>;
interface action_route<O extends string> extends options {
  action?: "route";
  outbound: O;
}
interface action_bypass<O extends string> extends options {
  action?: "bypass";
  outbound: O;
}
interface action_dns {
  action: "hijack-dns";
}

interface action_route_options extends options {
  action: "route-options";
}
interface options {
  override_address?: string;
  override_port?: number;
  network_strategy?: network_strategy;
  fallback_delay?: duration;
  udp_disable_domain_unmapping?: boolean;
  udp_connect?: boolean;
  udp_timeout?: duration;
  /**
   * Conflict with `tls_record_fragment`.
   */
  tls_fragment?: boolean;
  tls_fragment_fallback_delay?: duration;
  /**
   * Conflict with `tls_fragment`.
   */
  tls_record_fragment?: boolean;
  /**
   * fake server name
   */
  tls_spoof?: string;
  /**
   * @default wrong-sequence
   */
  tls_spoof_method?:
    | "wrong-sequence"
    | "wrong-checksum"
    | "wrong-ack"
    | "wrong-md5"
    | "wrong-timestamp";
}
interface action_sniff {
  action: "sniff";
  sniffer?: listable<sniff_protocol>;
  timeout?: duration;
}
interface action_resolve<DS extends string> extends Partial<resolver<DS>> {
  action: "resolve";
}
interface default_rule<I extends string, RS extends string, O extends string>
  extends default_rule_with_metadata<I, RS> {
  client?: listable<quic_client>;
  /**
   * Match specified outbounds' preferred routes.
   * Only support the tag of endpoint tailscale/wireguard/bridge now.
   */
  preferred_by?: listable<NoInfer<O>>;
}
interface logical_rule<
  O extends string,
  I extends string,
  RS extends string,
  DS extends string,
> extends base_logical_rule {
  rules: rule_item<O, I, RS, DS>[];
}

type rule_set<
  T extends string,
  O extends string,
  H extends string,
  DS extends string,
> = inline_rule_set<T> | local_rule_set<T> | remote_rule_set<T, O, H, DS>;
interface inline_rule_set<T extends string> extends item_with_tag<T> {
  type: "inline";
  rules: headless_rule[];
}

type rule_set_data_format = "source" | "binary";
interface outline_rule_set<T extends string> extends item_with_tag<T> {
  format?: rule_set_data_format;
}
interface local_rule_set<T extends string> extends outline_rule_set<T> {
  type: "local";
  path: string;
}
interface remote_rule_set<
  T extends string,
  O extends string,
  H extends string,
  DS extends string,
> extends outline_rule_set<T> {
  type: "remote";
  url: string;
  http_client?: H | headless_http_client<O, DS>;
  /**
   * @deprecated download_detour is deprecated in sing-box 1.14.0 and will be removed in sing-box 1.16.0, use {@link http_client} instead.
   * @since 1.14.0
   */
  download_detour?: O;
  update_interval?: duration;
}

type quic_client = "chromium" | "safari" | "firefox" | "quic-go";
