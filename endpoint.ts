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
  | openvpn_server<tag, inbound_tag>
  | openconnect<tag, outbound_tag, dns_server_tag>;

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
   * Tags to advertise for this node, for ACL enforcement purposes.
   * @example ["tag:server"]
   */
  advertise_tags?: listable<string>;
  /**
   * The UDP port to listen on for WireGuard and peer-to-peer traffic.
   * A port is automatically selected by default.
   * @since 1.14.0
   */
  listen_port?: number;
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
  /**
   * The directory where files received from tailnet peers (Taildrop) are stored.
   * Relative paths are resolved against the working directory, as `state_directory` is.
   * @default Taildrop
   * @since 1.14.0
   */
  taildrop_directory?: string;
}
type openvpn_client<T extends string, O extends string, DS extends string> =
  & dialer<O, DS>
  & item_with_tag<T>
  & base_openvpn
  & {
    type: "openvpn-client";
    remote_random?: boolean;
    address?: listable<string>;
    username?: string;
    password?: string;
    auth_retry?: "none" | "nointeract" | "interact";
    static_challenge?: string;
    static_challenge_echo?: boolean;
    tls: openvpn_outbound_tls;
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
    redirect_gateway?: boolean;
    redirect_gateway_flags?: listable<string>;
    redirect_private?: boolean;
    block_ipv6?: boolean;
    ping_restart_disabled?: boolean;
    tls_timeout?: duration;
    explicit_exit_notify?: number;
  }
  & (
    | server
    | { servers: openvpn_remote[] }
  );

type openvpn_server<T extends string, I extends string> =
  & listen<T, I>
  & Omit<base_openvpn, "udp_timeout" | "network">
  & {
    type: "openvpn-server";
    network?: "tcp" | "udp";
    remote?: string;
    remote_port?: number;
    max_clients?: number;
    address: string;
    duplicate_cn?: boolean;
    users?: { username: string; password: string }[];
    tls: openvpn_inbound_tls;
    push?: openvpn_push;
  };

type openconnect<T extends string, O extends string, DS extends string> =
  & dialer<O, DS>
  & item_with_tag<T>
  & udp_nat
  & {
    system?: boolean;
    name?: string;
    server: string;
    flavor?: "anyconnect" | "gp" | "fortinet" | "f5" | "pulse" | "nc";
    username?: string;
    password?: string;
    auth_group?: string;
    cookie?: string;
    token?: openconnect_token;
    reported_os?:
      | "linux"
      | "linux-64"
      | "win"
      | "mac-intel"
      | "android"
      | "apple-ios";
    user_agent?: string;
    version?: string;
    local_hostname?: string;
    mobile?: openconnect_mobile;
    csd?: openconnect_csd;
    hip?: openconnect_hip;
    tncc?: openconnect_tncc;
    fortinet_host_check?: openconnect_fortinet_host_check;
    no_udp?: boolean;
    dtls_local_port?: number;
    compression_disabled?: boolean;
    compression_mode?: "stateless" | "all";
    ipv6_disabled?: boolean;
    http_keepalive_disabled?: boolean;
    xml_post_disabled?: boolean;
    external_auth_disabled?: boolean;
    password_authentication_disabled?: boolean;
    tcp_keep_alive_enabled?: boolean;
    pfs?: boolean;
    mtu?: number;
    base_mtu?: number;
    dpd_interval?: duration;
    reconnect_timeout?: duration;
    trojan_interval?: duration;
    queue_length?: number;
    allow_insecure_crypto?: boolean;
    tls?: openconnect_tls;
    form_entries?: openconnect_form_entry[];
  };

type openconnect_token =
  & {
    mode: "totp" | "hotp" | "stoken" | "oidc";
    pin?: string;
    password?: string;
    device_id?: string;
    counter?: number;
  }
  & (
    | { secret: string }
    | { secret_path: string }
  );
interface openconnect_csd {
  wrapper_path?: string;
}
interface openconnect_hip {
  wrapper_path?: string;
}
interface openconnect_mobile {
  platform_version: string;
  device_type: string;
  device_unique_id: string;
}
interface openconnect_fortinet_host_check {
  hostcheck?: string;
  check_virtual_desktop?: string;
}
type openconnect_tncc =
  | { wrapper_path?: string }
  | {
    device_id?: string;
    user_agent?: string;
    machine_identification_enabled?: boolean;
    certificates?: openconnect_tncc_certificate[];
  };
type openconnect_tncc_certificate =
  | { certificate?: listable<string> }
  | { certificate_path?: string };

type openconnect_tls =
  & (
    | { certificate_authority?: listable<string> }
    | { certificate_authority_path?: string }
  )
  & (
    | { client_certificate?: listable<string> }
    | { client_certificate_path?: string }
  )
  & (
    | { client_key?: listable<string> }
    | { client_key_path?: string }
  )
  & (
    | { mca_certificate?: listable<string> }
    | { mca_certificate_path?: string }
  )
  & (
    | { mca_key?: listable<string> }
    | { mca_key_path?: string }
  )
  & {
    insecure?: boolean;
    server_name?: string;
    peer_fingerprint?: listable<string>;
    system_trust_disabled?: boolean;
    client_key_password?: string;
    mca_key_password?: string;
  };

interface openconnect_form_entry {
  form_id?: string;
  submission_key?: string;
  name?: string;
  value?: string;
  promote?: boolean;
}

interface base_openvpn extends udp_nat {
  system?: boolean;
  name?: string;
  mtu?: number;
  network?: openvpn_network;
  mode?: "tls" | "static_key";
  peer_address?: string;
  peer_address_ipv6?: string;
  topology?: "net30" | "p2p" | "subnet";
  static_key?: listable<string>;
  static_key_path?: string;
  key_direction?: "server" | "client";
  cipher?: string;
  data_ciphers?: listable<string>;
  data_ciphers_fallback?: string;
  auth?: string;
  mss_fix?: number;
  mss_fix_disabled?: boolean;
  mss_fix_mode?: "mtu" | "fixed";
  replay_window?: number;
  replay_window_time?: duration;
  renegotiate_disabled?: boolean;
  renegotiate_bytes?: number;
  renegotiate_packets?: number;
  handshake_window?: duration;
  ping_interval?: duration;
  ping_restart?: duration;
  renegotiate_interval?: duration;
}
interface openvpn_remote extends server {
  network?: openvpn_network;
}
type openvpn_network =
  | "udp"
  | "udp4"
  | "udp6"
  | "tcp"
  | "tcp4"
  | "tcp6";
interface openvpn_push {
  routes?: listable<string>;
  dns?: listable<string>;
  dns_servers?: openvpn_push_dns_server[];
  search_domains?: listable<string>;
  dhcp_options?: listable<string>;
  redirect_gateway?: boolean;
  redirect_gateway_flags?: listable<string>;
  block_outside_dns?: boolean;
  ping_interval?: duration;
  ping_restart?: duration;
}
interface openvpn_push_dns_server {
  priority: number;
  addresses: listable<string>;
  resolve_domains?: listable<string>;
  dnssec?: "yes" | "optional" | "no";
  transport?: "plain" | "dot" | "doh";
  sni?: string;
}
interface openvpn_pull_filter {
  action: "ignore" | "accept" | "reject";
  text: string;
}
type openvpn_inbound_tls =
  & {
    verify_client_certificate?: "require" | "optional" | "none";
    client_name?: string;
    client_name_type?: "subject" | "name" | "name-prefix";
    peer_fingerprint?: listable<string>;
    crl_path?: string;
    remote_certificate_ku?: listable<string>;
    remote_certificate_eku?: string;
    remote_certificate_tls?: "server" | "client" | "none";
    certificate_profile?: "insecure" | "legacy" | "preferred" | "suiteb";
    ns_certificate_type?: "server" | "client";
    version_min?: tls_version;
    version_max?: tls_version;
    cipher?: cipher_suites;
    groups?: string;
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
    remote_certificate_tls?: "server" | "client" | "none";
    certificate_profile?: "insecure" | "legacy" | "preferred" | "suiteb";
    ns_certificate_type?: "server" | "client";
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
