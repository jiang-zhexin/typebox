/**
 * @module
 * The http client field.
 *
 * @example
 * ```ts
 * import { createHttpClient } from "@zhexin/typebox/http_client"
 * ```
 */

import type { client_tls as tls } from "./tls.ts";
import type {
  dialer,
  duration,
  headers,
  item_with_tag,
  listable,
  memory_bytes,
} from "./types.ts";

export function createHttpClient<
  tag extends string,
  outbound_tag extends string = never,
  dns_server_tag extends string = never,
>(
  h: http_client<tag, outbound_tag, dns_server_tag>,
): http_client<tag, outbound_tag, dns_server_tag> {
  return h;
}

export type http_client<T extends string, O extends string, DS extends string> =
  & item_with_tag<T>
  & headless_http_client<O, DS>;

export type headless_http_client<O extends string, DS extends string> =
  & base_client<O, DS>
  & (http1_client | http2_client | quic_client);

export interface http1_client {
  version: 1;
}

export interface http2_client extends mux_client {
  version?: 0 | 2;
}

export interface quic_client extends mux_client {
  version: 3;
  initial_packet_size?: number;
  disable_path_mtu_discovery?: boolean;
}

/**
 * HTTP/2 and QUIC server parameters, flattened into the configuration.
 * HTTP/2 fields apply when serving version 2; QUIC fields require version 3.
 * @since 1.15.0
 */
export interface http_server extends Omit<quic_client, "version"> {
  version?: listable<1 | 2 | 3>;
}

interface base_client<O extends string, DS extends string>
  extends dialer<O, DS> {
  /**
   * @default go
   */
  engine?: "go" | "apple";
  disable_version_fallback?: boolean;
  headers?: headers;
  tls?: tls;
}

interface mux_client {
  idle_timeout?: duration;
  keep_alive_period?: duration;
  stream_receive_window?: memory_bytes;
  connection_receive_window?: memory_bytes;
  max_concurrent_streams?: number;
}
