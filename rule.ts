import type {
  listable,
  network,
  network_type,
  sniff_protocol,
} from "./types.ts";

interface rule {
  invert?: boolean;
}

export interface base_default_rule extends rule {
  type?: "default";
  network?: listable<network>;
  domain?: listable<string>;
  domain_suffix?: listable<string>;
  domain_keyword?: listable<string>;
  domain_regex?: listable<string>;
  source_ip_cidr?: listable<string>;
  ip_cidr?: listable<string>;
  source_port?: listable<number>;
  source_port_range?: listable<string>;
  port?: listable<number>;
  port_range?: listable<string>;
  process_name?: listable<string>;
  process_path?: listable<string>;
  process_path_regex?: listable<string>;
  package_name?: listable<string>;
  package_name_regex?: listable<string>;
  wifi_ssid?: listable<string>;
  wifi_bssid?: listable<string>;
  network_type?: listable<network_type>;
  network_is_expensive?: boolean;
  network_is_constrained?: boolean;
  interface_address?: Record<string, listable<string>>;
  network_interface_address?: Record<network_type, listable<string>>;
  default_interface_address?: listable<string>;
  source_mac_address?: listable<string>;
  source_hostname?: listable<string>;
}

export interface base_logical_rule extends rule {
  type: "logical";
  mode: "and" | "or";
}

export interface default_rule_with_metadata<
  I extends string,
  RS extends string,
  DS extends string = string,
> extends base_default_rule {
  inbound?: listable<I>;
  ip_version?: 4 | 6;
  auth_user?: listable<string>;
  protocol?: listable<sniff_protocol>;
  ip_is_private?: boolean;
  source_ip_is_private?: boolean;
  user?: listable<string>;
  user_id?: listable<number>;
  clash_mode?: string;
  /**
   * Match DNS server addresses obtained from the system, DHCP or VPN.
   * Keys are DNS server tags; values are IP addresses or CIDR prefixes.
   * @since 1.15.0
   */
  dns_server_address?: Partial<Record<DS, listable<string>>>;
  /**
   * Match search domains obtained from the system, DHCP or VPN.
   * Keys are DNS server tags; values are search domains.
   * @since 1.15.0
   */
  dns_search_domain?: Partial<Record<DS, listable<string>>>;
  rule_set?: listable<RS>;
  rule_set_ip_cidr_match_source?: boolean;
}
