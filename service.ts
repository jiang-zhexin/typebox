/**
 * @module
 * The service field.
 *
 * @example
 * ```ts
 * import { createService } from "@zhexin/typebox/service"
 * ```
 */

import type { dialer, headers, listable, listen, server } from './types.ts'
import type { client_tls, server_tls } from './tls.ts'

export const createService = <
    tag extends string,
    outbound_tag extends string,
    inbound_tag extends string,
    dns_server_tag extends string,
>(service: service<tag, outbound_tag, inbound_tag, dns_server_tag>): service<tag, outbound_tag, inbound_tag, dns_server_tag> => service

export type service<tag extends string, outbound_tag extends string, inbound_tag extends string, dns_server_tag extends string> =
    | derp<tag, outbound_tag, inbound_tag, dns_server_tag>
    | resolved<tag, inbound_tag>
    | ssm_api<tag, outbound_tag, inbound_tag, dns_server_tag>
    | ccm<tag, outbound_tag, inbound_tag, dns_server_tag>

interface derp<T extends string, O extends string, I extends string, DS extends string> extends listen<T, I> {
    type: 'derp'
    tls: server_tls<O, DS>
    config_path: string
    verify_client_endpoint?: listable<string>
    verify_client_url?: listable<verify_client_url<O, DS>> | listable<string>
    home?: string
    mesh_with?: listable<mesh_with<O, DS>>
    mesh_psk?: string
    mesh_psk_file?: string
    stun?: stun<T, I>
}

interface resolved<T extends string, I extends string> extends listen<T, I> {
    type: 'resolved'
}

interface ssm_api<T extends string, O extends string, I extends string, DS extends string> extends listen<T, I> {
    type: 'ssm-api'
    servers: { [key: string]: I }
    cache_path?: string
    tls?: server_tls<O, DS>
}

interface ccm<T extends string, O extends string, I extends string, DS extends string> extends Omit<listen<T, I>, 'detour'> {
    type: 'ccm'
    credential_path?: string
    usages_path?: string
    users?: ccm_user[]
    headers?: headers
    detour?: O
    tls: server_tls<O, DS>
}

interface ccm_user {
    name?: string
    token?: string
}

interface verify_client_url<O extends string, DS extends string> extends dialer<O, DS> {
    url: string
}

interface mesh_with<O extends string, DS extends string> extends dialer<O, DS>, server {
    host?: string
    tls?: client_tls
}

interface stun<T extends string, I extends string> extends listen<T, I> {
    enable: true
}
