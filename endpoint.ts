import type { dialer, duration, item_with_tag, listable } from './types.ts'

export const createEndpoint = <
    const E extends endpoint<OT[number], DS[number]>,
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(endpoint: E, _options?: {
    assertExistOutbounds?: OT
    assertExistDnsServers?: DS
}) => endpoint

export const createEndpoints = <
    const E extends readonly endpoint<E[number]['tag'] | OT[number], DS[number]>[],
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(endpoints: E, _options?: {
    assertExistOutbounds?: OT
    assertExistDnsServers?: DS
}) => endpoints

/**
 * You should not use this directly, instead use {@link createEndpoint} or {@link createEndpoints}.
 */
export type endpoint<
    O extends string = never,
    DS extends string = never,
> = wireguard<O, DS>

export declare namespace endpoint {
    export { wireguard }
}

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
interface peer {
    address: string
    port: number
    public_key: string
    pre_shared_key?: string
    allowed_ips: listable<string>
    persistent_keepalive_interval?: number
    reserved?: number[]
}
