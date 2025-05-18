/**
 * @module
 * The service field.
 *
 * @example
 * ```ts
 * import { createService } from "@zhexin/typebox/service"
 * ```
 */

import type { dialer, item_with_tag, listable, listen, server } from './types.ts'
import type { client_tls, server_tls } from './tls.ts'

export const createService = <
    const S extends service<O[number], I[number], DS[number]>,
    const O extends readonly string[] = never,
    const I extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(service: S, _options?: {
    assertExistOutbounds?: O
    assertExistInbounds?: I
    assertExistDnsServers?: DS
}): S => service

export type service<O extends string = never, I extends string = never, DS extends string = never> = derp<O, I, DS> | resolved<I> | ssm_api<O, I, DS>

interface derp<O extends string = never, I extends string = never, DS extends string = never> extends listen<I>, item_with_tag {
    type: 'derp'
    tls: server_tls<O, DS>
    config_path: string
    verify_client_endpoint?: listable<string>
    verify_client_url?: listable<verify_client_url<O, DS>> | listable<string>
    mesh_with?: listable<mesh_with<O, DS>>
    mesh_psk?: string
    mesh_psk_file?: string
    stun?: stun
}

interface resolved<I extends string = never> extends listen<I>, item_with_tag {
    type: 'resolved'
}

interface ssm_api<O extends string = never, I extends string = never, DS extends string = never> extends listen<I>, item_with_tag {
    type: 'ssm-api'
    servers: { [key: string]: I }
    tls?: server_tls<O, DS>
}

interface verify_client_url<O extends string, DS extends string> extends dialer<O, DS> {
    url: string
}

interface mesh_with<O extends string, DS extends string> extends dialer<O, DS>, server {
    host?: string
    tls?: client_tls
}

interface stun<I extends string = never> extends listen<I> {
    enable: true
}
