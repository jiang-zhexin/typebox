/**
 * @module
 * The endpoints field.
 *
 * @example
 * ```ts
 * import { createEndpoint, createEndpoints } from "@zhexin/typebox/endpoint"
 * ```
 */

import type { cipher_suites, tls_version } from "./tls.ts";
import type {
  dialer,
  duration,
  item_with_tag,
  listable,
  listen,
  non_empty_array,
  server,
  udp_nat,
} from "./types.ts";

export function createEndpoint<
  tag extends string,
  outbound_tag extends string = never,
  dns_server_tag extends string = never,
  inbound_tag extends string = never,
>(
  endpoint: endpoint<tag, outbound_tag, dns_server_tag, inbound_tag>,
): endpoint<tag, outbound_tag, dns_server_tag, inbound_tag> {
  return endpoint;
}

export function createEndpoints<
  tag extends string,
  outbound_tag extends string = never,
  dns_server_tag extends string = never,
  inbound_tag extends string = never,
>(
  endpoints: non_empty_array<
    endpoint<tag, outbound_tag | NoInfer<tag>, dns_server_tag, inbound_tag>
  >,
): non_empty_array<
  endpoint<tag, outbound_tag | NoInfer<tag>, dns_server_tag, inbound_tag>
> {
  return endpoints;
}

/**
 * You should not use this directly, instead use {@link createEndpoint} or {@link createEndpoints}.
 */
export type endpoint<
  tag extends string,
  outbound_tag extends string,
  dns_server_tag extends string,
  inbound_tag extends string,
> =
  | wireguard<tag, outbound_tag, dns_server_tag>
  | tailscale<tag, outbound_tag, dns_server_tag>
  | openvpn_client<tag, outbound_tag, dns_server_tag>
  | openvpn_server<tag, inbound_tag>;

interface wireguard<T extends string, O extends string, DS extends string>
  extends dialer<O, DS>, item_with_tag<T>, udp_nat {
  type: "wireguard";
  name?: string;
  system?: boolean;
  mtu?: number;
  address: listable<string>;
  private_key: string;
  listen_port: number;
  peers: peer[];
  workers?: number;
}
interface tailscale<T extends string, O extends string, DS extends string>
  extends dialer<O, DS>, item_with_tag<T> {
  type: "tailscale";
  /**
   * The directory where the Tailscale state is stored.
   * @default tailscale
   * @example $HOME/.tailscale
   */
  state_directory?: string;
  /**
   * The auth key to create the node. If the node is already created (from state previously stored), then this field is not used.
   */
  auth_key?: string;
  /**
   * The coordination server URL.
   * @default https://controlplane.tailscale.com
   */
  control_url?: string;
  /**
   * Indicates whether the instance should register as an Ephemeral node (https://tailscale.com/s/ephemeral-nodes).
   */
  ephemeral?: boolean;
  /**
   * The hostname of the node.
   * @default $HOSTNAME
   * @example localhost
   */
  hostname?: string;
  /**
   * Indicates whether the node should accept routes advertised by other nodes.
   */
  accept_routes?: boolean;
  /**
   * The exit node name or IP address to use.
   */
  exit_node?: string;
  /**
   * Indicates whether locally accessible subnets should be routed directly or via the exit node.
   */
  exit_node_allow_lan_access?: boolean;
  /**
   * CIDR prefixes to advertise into the Tailscale network as reachable through the current node.
   * @example ["192.168.1.1/24"]
   */
  advertise_routes?: string[];
  /**
   * Indicates whether the node should advertise itself as an exit node.
   */
  advertise_exit_node?: boolean;
  /**
   * The port to listen on for incoming relay connections from other Tailscale nodes.
   */
  relay_server_port?: number;
  /**
   * Static endpoints to advertise for the relay server.
   */
  relay_server_static_endpoints?: string[];
  /**
   * Create a system TUN interface for Tailscale.
   */
  system_interface?: boolean;
  /**
   * Custom TUN interface name.
   * @default tailscale
   */
  system_interface_name?: string;
  /**
   * Override the TUN MTU.
   */
  system_interface_mtu?: number;
  /**
   * UDP NAT expiration time.
   * @default 5m
   */
  udp_timeout?: duration;
  /**
   * Run a Tailscale SSH server on tailnet port 22.
   */
  ssh_server?: true | ssh_server;
}
type openvpn_client<T extends string, O extends string, DS extends string> =
  & dialer<O, DS>
  & item_with_tag<T>
  & base_openvpn
  & {
    type: "openvpn-client";
    remote_random: boolean;
    username?: string;
    password?: string;
    auth_retry?: "none" | "nointeract" | "interact";
    static_challenge?: string;
    static_challenge_echo?: boolean;
    tls: openvpn_outbound_tls;
    mss_fix?: number;
    fragment?: number;
    compression?:
      | "none"
      | "no"
      | "lz4"
      | "lz4-v2"
      | "stub"
      | "stub-v2"
      | "disabled"
      | "off";
    compression_lzo?:
      | "none"
      | "no"
      | "yes"
      | "adaptive"
      | "asym"
      | "disabled"
      | "off";
    allow_compression?: "no" | "asym" | "yes";
    route_no_pull?: boolean;
    pull_filters?: openvpn_pull_filter[];
    routes?: listable<string>;
    route_gateway?: string;
    route_metric?: number;
    redirect_gateway?: false;
    redirect_gateway_flags?: listable<string>;
    explicit_exit_notify?: number;
  }
  & (
    | server
    | { servers: openvpn_remote[] }
  );

type openvpn_server<T extends string, I extends string> =
  & listen<T, I>
  & Omit<base_openvpn, "udp_timeout">
  & {
    type: "openvpn-server";
    max_clients?: number;
    address: string;
    topology?: "subnet" | "p2p" | "net30";
    duplicate_cn?: boolean;
    users?: { username: string; password: string }[];
    tls: openvpn_inbound_tls;
    push?: openvpn_push;
  };

interface base_openvpn extends udp_nat {
  system?: boolean;
  name?: string;
  mtu?: number;
  network?: "udp" | "tcp";
  data_ciphers?: listable<string>;
  data_ciphers_fallback?: string;
  auth?: string;
  ping_interval?: duration;
  ping_restart?: duration;
  renegotiate_interval?: duration;
}
interface openvpn_remote extends server {
  network?: "udp" | "tcp";
}
interface openvpn_push {
  routes?: listable<string>;
  dns?: listable<string>;
  redirect_gateway?: false;
  redirect_gateway_flags?: listable<string>;
  block_outside_dns?: boolean;
  ping_interval?: duration;
  ping_restart?: duration;
}
interface openvpn_pull_filter {
  action: "ignore" | "accept" | "reject";
  text: string;
}
type openvpn_inbound_tls =
  & {
    verify_client_certificate?: "require" | "optional" | "none";
    control_wrap?: openvpn_control_wrap & { force_cookie?: boolean };
  }
  & (
    | { certificate?: listable<string> }
    | { certificate_path?: string }
  )
  & (
    | { key?: listable<string> }
    | { key_path?: string }
  )
  & (
    | { client_certificate?: listable<string> }
    | { client_certificate_path?: string }
  );
type openvpn_outbound_tls =
  & {
    server_name?: string;
    server_name_type?: "name" | "subject" | "name-prefix";
    peer_fingerprint?: listable<string>;
    crl_path?: string;
    remote_certificate_ku?: listable<string>;
    remote_certificate_eku?: string;
    version_min?: tls_version;
    version_max?: tls_version;
    cipher?: cipher_suites;
    groups?: string;
    control_wrap?: openvpn_control_wrap;
  }
  & (
    | { certificate?: listable<string> }
    | { certificate_path?: string }
  )
  & (
    | { client_certificate?: listable<string> }
    | { client_certificate_path?: string }
  )
  & (
    | { client_key?: listable<string> }
    | { client_key_path?: string }
  );
type openvpn_control_wrap =
  & (
    | { type: "tls_auth"; direction?: "server" | "client" }
    | { type?: "tls_crypt" | "tls_crypt_v2" }
  )
  & (
    | { key?: listable<string> }
    | { key_path?: string }
  );

interface ssh_server {
  enabled: true;
  disable_pty?: boolean;
  disable_sftp?: boolean;
  disable_forwarding?: boolean;
}

interface peer {
  address: string;
  port: number;
  public_key: string;
  pre_shared_key?: string;
  allowed_ips: listable<string>;
  persistent_keepalive_interval?: number;
  reserved?: number[];
}
