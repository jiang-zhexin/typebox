import type { duration, listable } from './types.ts'

export type transport =
    | transport.http
    | transport.websocket
    | transport.quic
    | transport.grpc
    | transport.httpupgrade

export declare namespace transport {
    export interface http {
        type: 'http'
        host?: listable<string>
        path?: string
        method?:
            | 'GET'
            | 'HEAD'
            | 'POST'
            | 'PUT'
            | 'PATCH'
            | 'DELETE'
            | 'CONNECT'
            | 'OPTIONS'
            | 'TRACE'
        headers?: headers
        idle_timeout?: duration
        ping_timeout?: duration
    }
    export interface websocket {
        type: 'ws'
        path?: string
        headers?: headers
        max_early_data?: number
        early_data_header_name?: string
    }
    export interface quic {
        type: 'quic'
    }
    export interface grpc {
        type: 'grpc'
        service_name?: string
        idle_timeout?: duration
        ping_timeout?: duration
        permit_without_stream?: boolean
    }
    export interface httpupgrade {
        type: 'httpupgrade'
        host?: string
        path?: string
        headers?: headers
    }
    type headers = {
        [key: string]: string
    }
}
