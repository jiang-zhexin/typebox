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

export declare namespace typebox {
    export { log, dns, inbound, outbound, route, experimental, ntp }
}
