/**
 * @module
 * Typebox - Type safety of sing-box config.
 *
 * @example
 * ```ts
 * import { createTypebox } from "@zhexin/typebox"
 * import { createOutbound } from "@zhexin/typebox/outbound"
 *
 * const ss_out = createOutbound({
 *     type: 'shadowsocks',
 *     tag: 'ss-out',
 *     method: '2022-blake3-aes-128-gcm',
 *     password: '',
 *     server: '',
 *     server_port: 11451,
 *     multiplex: {
 *         enabled: true,
 *     },
 * })
 *
 * const config = createTypebox({
 *     log: {},
 *     dns: {},
 *     endpoints: [],
 *     inbounds: [],
 *     outbounds: [ss_out],
 *     route: {},
 *     experimental: {},
 * })
 * ```
 */

import type { certificate } from "./certificate.ts";
import type { certificate_provider } from "./certificate_provider.ts";
import type { dns } from "./dns.ts";
import type { endpoint } from "./endpoint.ts";
import type { experimental } from "./experimental.ts";
import type { http_client } from "./http_client.ts";
import type { inbound } from "./inbound.ts";
import type { log } from "./log.ts";
import type { network_namespace } from "./network_namespace.ts";
import type { ntp } from "./ntp.ts";
import type { outbound } from "./outbound.ts";
import type { route } from "./route.ts";
import type { service } from "./service.ts";
import type { non_empty_array } from "./types.ts";

/**
 * You should not use this directly, instead use {@link createTypebox}.
 */
export interface typebox<
  outbound_tag extends string,
  inbound_tag extends string,
  endpoint_tag extends string,
  dns_server_tag extends string,
  rule_set_tag extends string,
  service_tag extends string,
  certificate_provider_tag extends string,
  http_client_tag extends string,
  match_response_tag extends string,
> {
  $schema?: string;
  log?: log;
  dns?: dns<
    dns_server_tag,
    NoInfer<dns_server_tag>,
    NoInfer<outbound_tag | endpoint_tag>,
    NoInfer<inbound_tag | endpoint_tag>,
    NoInfer<service_tag>,
    NoInfer<rule_set_tag>,
    match_response_tag,
    NoInfer<match_response_tag>
  >;
  endpoints?: non_empty_array<
    endpoint<
      endpoint_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<dns_server_tag>,
      NoInfer<inbound_tag | endpoint_tag>
    >
  >;
  inbounds?: non_empty_array<
    inbound<
      inbound_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<dns_server_tag>,
      NoInfer<inbound_tag | endpoint_tag>,
      NoInfer<rule_set_tag>,
      NoInfer<certificate_provider_tag>,
      NoInfer<http_client_tag>
    >
  >;
  outbounds?: non_empty_array<
    outbound<
      outbound_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<dns_server_tag>,
      NoInfer<http_client_tag>
    >
  >;
  route?: route<
    rule_set_tag,
    NoInfer<rule_set_tag>,
    NoInfer<outbound_tag | endpoint_tag>,
    NoInfer<inbound_tag | endpoint_tag>,
    NoInfer<dns_server_tag>,
    NoInfer<http_client_tag>
  >;
  services?: non_empty_array<
    service<
      service_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<inbound_tag | endpoint_tag>,
      NoInfer<dns_server_tag>,
      NoInfer<certificate_provider_tag>,
      NoInfer<http_client_tag>
    >
  >;
  experimental?: experimental;
  ntp?: ntp<
    NoInfer<outbound_tag | endpoint_tag>,
    NoInfer<dns_server_tag>
  >;
  certificate?: certificate;
  certificate_providers?: non_empty_array<
    certificate_provider<
      certificate_provider_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<http_client_tag>,
      NoInfer<dns_server_tag>
    >
  >;
  http_clients?: non_empty_array<
    http_client<
      http_client_tag,
      NoInfer<outbound_tag | endpoint_tag>,
      NoInfer<dns_server_tag>
    >
  >;
  network_namespaces?: non_empty_array<network_namespace>;
}

/**
 * @example
 * ```ts
 * import { createTypebox } from "@zhexin/typebox"
 *
 * const config = createTypebox({
 *     log: {},
 *     dns: {},
 *     endpoints: [],
 *     inbounds: [],
 *     outbounds: [],
 *     route: {},
 *     experimental: {},
 * })
 * ```
 */
export function createTypebox<
  outbound_tag extends string = never,
  inbound_tag extends string = never,
  endpoint_tag extends string = never,
  dns_server_tag extends string = never,
  rule_set_tag extends string = never,
  service_tag extends string = never,
  certificate_provider_tag extends string = never,
  http_client_tag extends string = never,
  match_response_tag extends string = never,
>(
  typebox: typebox<
    outbound_tag,
    inbound_tag,
    endpoint_tag,
    dns_server_tag,
    rule_set_tag,
    service_tag,
    certificate_provider_tag,
    http_client_tag,
    match_response_tag
  >,
): typebox<
  outbound_tag,
  inbound_tag,
  endpoint_tag,
  dns_server_tag,
  rule_set_tag,
  service_tag,
  certificate_provider_tag,
  http_client_tag,
  match_response_tag
> {
  return typebox;
}
