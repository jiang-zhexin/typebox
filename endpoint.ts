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
    const E extends endpoint<OT[number] | string, DS[number] | string>,
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(endpoint: E, _options?: {
    /**
     * @deprecated
     */
    assertExistOutbounds?: OT
    /**
     * @deprecated
     */
    assertExistDnsServers?: DS
}): E => endpoint

export const createEndpoints = <
    const E extends readonly endpoint<E[number]['tag'] | OT[number], DS[number] | string>[],
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(endpoints: E, _options?: {
    assertExistOutbounds?: OT
    /**
     * @deprecated
     */
    assertExistDnsServers?: DS
}): E => endpoints

/**
 * You should not use this directly, instead use {@link createEndpoint} or {@link createEndpoints}.
 */
export type endpoint<
    O extends string = never,
    DS extends string = never,
> = wireguard<O, DS> | tailscale<O, DS>

interface wireguard<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
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
interface tailscale<O extends string = never, DS extends string = never> extends dialer<O, DS>, item_with_tag {
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
