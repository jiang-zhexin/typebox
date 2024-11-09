import type * as dns from './dns.ts'
import type * as experimental from './experimental.ts'
import type * as inbound from './inbound.ts'
import type * as log from './log.ts'
import type * as ntp from './ntp.ts'
import type * as outbound from './outbound.ts'
import type * as route from './route.ts'

export interface typebox {
    log?: log.log
    dns?: dns.dns
    inbounds?: inbound.inbound[]
    outbounds?: outbound.outbound[]
    route?: route.route
    experimental?: experimental.experimental
    ntp?: ntp.ntp
}

export * as dns from './dns.ts'
export * as experimental from './experimental.ts'
export * as inbound from './inbound.ts'
export * as log from './log.ts'
export * as ntp from './ntp.ts'
export * as outbound from './outbound.ts'
export * as route from './route.ts'
export * as transport from './transport.ts'
export * as _ from './types.ts'
