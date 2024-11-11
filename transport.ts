import type { duration, headers, http_method, listable } from './types.ts'

export type transport = http | websocket | quic | grpc | httpupgrade

interface http {
    type: 'http'
    host?: listable<string>
    path?: string
    method?: http_method
    headers?: headers
    idle_timeout?: duration
    ping_timeout?: duration
}
interface websocket {
    type: 'ws'
    path?: string
    headers?: headers
    max_early_data?: number
    early_data_header_name?: string
}
interface quic {
    type: 'quic'
}
interface grpc {
    type: 'grpc'
    service_name?: string
    idle_timeout?: duration
    ping_timeout?: duration
    permit_without_stream?: boolean
}
interface httpupgrade {
    type: 'httpupgrade'
    host?: string
    path?: string
    headers?: headers
}
