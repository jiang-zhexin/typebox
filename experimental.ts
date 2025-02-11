/**
 * @module
 * The experimental field.
 *
 * @example
 * ```ts
 * import { createExperimental, createCacheFile, createClashApi, createV2rayApi } from "@zhexin/typebox/experimental"
 * ```
 */

import type { duration, listable } from './types.ts'

export const createExperimental = <
    const E extends experimental,
>(e: E): E => e

export const createCacheFile = <
    const C extends cache_file,
>(c: C): C => c

export const createClashApi = <
    const C extends clash_api,
>(c: C): C => c

export const createV2rayApi = <
    const V extends v2ray_api,
>(v: V): V => v

/**
 * You should not use this directly, instead use {@link createExperimental}.
 */
export interface experimental {
    cache_file?: cache_file
    clash_api?: clash_api
    v2ray_api?: v2ray_api
}

export declare namespace experimental {
    export { cache_file, clash_api, v2ray_api }
}

/**
 * You should not use this directly, instead use {@link createCacheFile}.
 */
interface cache_file {
    enabled: true
    path?: string
    cache_id?: string
    store_fakeip?: boolean
    store_rdrc?: boolean
    rdrc_timeout?: duration
}

/**
 * You should not use this directly, instead use {@link createClashApi}.
 */
interface clash_api {
    external_controller?: string
    external_ui?: string
    external_ui_download_url?: string
    external_ui_download_detour?: string
    secret?: string
    default_mode?: string
    access_control_allow_origin?: listable<string>
    access_control_allow_private_network?: boolean
}

/**
 * You should not use this directly, instead use {@link createV2rayApi}.
 */
interface v2ray_api {
    listen?: string
    stats?: {
        enabled: true
        inbounds?: string[]
        outbounds?: string[]
        users?: string[]
    }
}
