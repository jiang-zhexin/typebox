import type { duration, headers, listable } from './types.ts'

export type transport = http | websocket | quic | grpc | httpupgrade

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
