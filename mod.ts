import type { dns } from './dns.ts'
import type { experimental } from './experimental.ts'
import type { inbound } from './inbound.ts'
import type { log } from './log.ts'
import type { ntp } from './ntp.ts'
import type { outbound } from './outbound.ts'
import type { route } from './route.ts'

export interface typebox {
    log?: log
    dns?: dns
    inbounds?: inbound[]
    outbounds?: outbound[]
    route?: route
    experimental?: experimental
    ntp?: ntp
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
