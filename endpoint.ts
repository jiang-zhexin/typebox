import type { dialer, duration, item_with_tag, listable } from './types.ts'

export const createEndpoint = <
    const E extends endpoint<never, never>,
>(endpoint: E) => endpoint

export const createEndpoints = <
    const E extends readonly endpoint<E[number]['tag'], never>[],
>(endpoints: E) => endpoints

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
