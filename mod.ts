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
