/**
 * @module
 * The endpoints field.
 *
 * @example
 * ```ts
 * import { createEndpoint, createEndpoints } from "@zhexin/typebox/endpoint"
 * ```
 */

import type { dialer, duration, item_with_tag, listable } from './types.ts'

export const createEndpoint = <
    tag extends string,
    outbound_tag extends string = never,
    dns_server_tag extends string = never,
>(endpoint: endpoint<tag, outbound_tag, dns_server_tag>): endpoint<tag, outbound_tag, dns_server_tag> => endpoint

export const createEndpoints = <
    tag extends string,
    outbound_tag extends string,
    dns_server_tag extends string,
    E extends endpoint<tag, outbound_tag | E['tag'], dns_server_tag>,
>(endpoints: E[]): E[] => endpoints

/**
 * You should not use this directly, instead use {@link createEndpoint} or {@link createEndpoints}.
 */
export type endpoint<
    tag extends string,
    outbound_tag extends string,
    dns_server_tag extends string,
> = wireguard<tag, outbound_tag, dns_server_tag> | tailscale<tag, outbound_tag, dns_server_tag>

interface wireguard<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'wireguard'
    name?: string
    system?: boolean
    mtu?: number
    address: listable<string>
    private_key: string
    listen_port: number
    peers: peer[]
    udp_timeout?: duration
    workers?: number
}
interface tailscale<T extends string, O extends string, DS extends string> extends dialer<O, DS>, item_with_tag<T> {
    type: 'tailscale'
    /**
     * The directory where the Tailscale state is stored.
     * @default tailscale
     * @example $HOME/.tailscale
     */
    state_directory?: string
    /**
     * The auth key to create the node. If the node is already created (from state previously stored), then this field is not used.
     */
    auth_key?: string
    /**
     * The coordination server URL.
     * @default https://controlplane.tailscale.com
     */
    control_url?: string
    /**
     * Indicates whether the instance should register as an Ephemeral node (https://tailscale.com/s/ephemeral-nodes).
     */
    ephemeral?: boolean
    /**
     * The hostname of the node.
     * @default $HOSTNAME
     * @example localhost
     */
    hostname?: string
    /**
     * Indicates whether the node should accept routes advertised by other nodes.
     */
    accept_routes?: boolean
    /**
     * The exit node name or IP address to use.
     */
    exit_node?: string
    /**
     * Indicates whether locally accessible subnets should be routed directly or via the exit node.
     */
    exit_node_allow_lan_access?: boolean
    /**
     * CIDR prefixes to advertise into the Tailscale network as reachable through the current node.
     * @example ["192.168.1.1/24"]
     */
    advertise_routes?: string[]
    /**
     * Indicates whether the node should advertise itself as an exit node.
     */
    advertise_exit_node?: boolean
    /**
     * The port to listen on for incoming relay connections from other Tailscale nodes.
     */
    relay_server_port?: number
    /**
     * Static endpoints to advertise for the relay server.
     */
    relay_server_static_endpoints?: string[]
    /**
     * Create a system TUN interface for Tailscale.
     */
    system_interface?: boolean
    /**
     * Custom TUN interface name.
     * @default tailscale
     */
    system_interface_name?: string
    /**
     * Override the TUN MTU.
     */
    system_interface_mtu?: number
    /**
     * UDP NAT expiration time.
     * @default 5m
     */
    udp_timeout?: duration
}

interface peer {
    address: string
    port: number
    public_key: string
    pre_shared_key?: string
    allowed_ips: listable<string>
    persistent_keepalive_interval?: number
    reserved?: number[]
}
