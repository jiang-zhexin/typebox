/**
 * @module
 * The certificate provider field.
 *
 * @example
 * ```ts
 * import { createCertificateProvider } from "@zhexin/typebox/certificate_provider"
 * ```
 */

import type { headless_http_client } from "./http_client.ts";
import type { duration, item_with_tag, listable } from "./types.ts";

export function createCertificateProvider<
  tag extends string,
  outbound_tag extends string = never,
  http_client_tag extends string = never,
  dns_server_tag extends string = never,
>(
  cp: certificate_provider<tag, outbound_tag, http_client_tag, dns_server_tag>,
): certificate_provider<tag, outbound_tag, http_client_tag, dns_server_tag> {
  return cp;
}

export type certificate_provider<
  T extends string,
  O extends string,
  H extends string,
  DS extends string,
> =
  & item_with_tag<T>
  & headless_certificate_provider<O, H, DS>;
export type headless_certificate_provider<
  O extends string,
  H extends string,
  DS extends string,
> = acme<O, H, DS> | tailscale<O> | cloudflare<O, H, DS>;

interface acme<O extends string, H extends string, DS extends string> {
  type: "acme";
  domain: listable<string>;
  /**
   * @default $XDG_DATA_HOME/certmagic
   * @default $HOME/.local/share/certmagic
   */
  data_directory?: string;
  default_server_name?: string;
  email?: string;
  provider?: "letsencrypt" | "zerossl" | string;
  account_key?: string;
  disable_http_challenge?: boolean;
  disable_tls_alpn_challenge?: boolean;
  alternative_http_port?: number;
  alternative_tls_port?: number;
  external_account?: {
    key_id: string;
    mac_key: string;
  };
  dns01_challenge?: dns01;
  key_type?: "ed25519" | "p256" | "p384" | "rsa2048" | "rsa4096";
  profile?: string;
  /**
   * @deprecated will be removed in sing-box 1.16.0.
   * @since 1.14.0
   */
  detour?: O;
  http_client?: H | headless_http_client<O, DS>;
}

interface tailscale<E extends string> {
  type: "tailscale";
  endpoint: E;
}

type cloudflare<O extends string, H extends string, DS extends string> =
  | origin_ca_key_cloudflare<O, H, DS>
  | api_token_cloudflare<O, H, DS>;

interface origin_ca_key_cloudflare<
  O extends string,
  H extends string,
  DS extends string,
> extends base_cloudflare<O, H, DS> {
  origin_ca_key: string;
}

interface api_token_cloudflare<
  O extends string,
  H extends string,
  DS extends string,
> extends base_cloudflare<O, H, DS> {
  api_token: string;
}

interface base_cloudflare<
  O extends string,
  H extends string,
  DS extends string,
> {
  type: "cloudflare-origin-ca";
  domain: listable<string>;
  /**
   * @default $XDG_DATA_HOME/certmagic
   * @default $HOME/.local/share/certmagic
   */
  data_directory?: string;
  /**
   * @default origin-rsa
   */
  request_type?: "origin-rsa" | "origin-ecc";
  /**
   * @default 5475
   */
  requested_validity?: 7 | 30 | 90 | 365 | 730 | 1095 | 5475;
  http_client?: H | headless_http_client<O, DS>;
  /**
   * @deprecated
   */
  detour?: O;
}

type dns01 = dns01_ali | dns01_cf | acmedns;

interface dns01_ali {
  provider: "alidns";
  access_key_id: string;
  access_key_secret: string;
  region_id: string;
  security_token: string;
  ttl?: duration;
  propagation_delay?: duration;
  propagation_timeout?: duration;
  resolvers?: listable<string>;
  override_domain?: string;
}

interface dns01_cf {
  provider: "cloudflare";
  api_token: string;
  zone_token?: string;
  ttl?: duration;
  propagation_delay?: duration;
  propagation_timeout?: duration;
  resolvers?: listable<string>;
  override_domain?: string;
}

interface acmedns {
  provider: "acmedns";
  username: string;
  password: string;
  subdomain: string;
  server_url: string;
  ttl?: duration;
  propagation_delay?: duration;
  propagation_timeout?: duration;
  resolvers?: listable<string>;
  override_domain?: string;
}
