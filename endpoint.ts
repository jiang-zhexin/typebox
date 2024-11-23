import type { dialer, duration, item_with_tag, listable } from './types.ts'

export type endpoint = wireguard

export declare namespace endpoint {
    export { wireguard }
}

interface wireguard extends dialer, item_with_tag {
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
