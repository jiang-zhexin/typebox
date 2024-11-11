import type { duration, listable } from './types.ts'

export interface experimental {
    cache_file?: experimental.cache_file
    clash_api?: experimental.clash_api
    v2ray_api?: experimental.v2ray_api
}

export declare namespace experimental {
    export interface cache_file {
        enabled: true
        path?: string
        cache_id?: string
        store_fakeip?: boolean
        store_rdrc?: boolean
        rdrc_timeout?: duration
    }
    export interface clash_api {
        external_controller?: string
        external_ui?: string
        external_ui_download_url?: string
        external_ui_download_detour?: string
        secret?: string
        default_mode?: string
        access_control_allow_origin?: listable<string>
        access_control_allow_private_network?: boolean
    }
    export interface v2ray_api {
        listen?: string
        stats?: {
            enabled: true
            inbounds?: string[]
            outbounds?: string[]
            users?: string[]
        }
    }
}
