import type { certificate } from './certificate.ts'
import type { dns } from './dns.ts'
import type { endpoint } from './endpoint.ts'
import type { experimental } from './experimental.ts'
import type { inbound } from './inbound.ts'
import type { log } from './log.ts'
import type { ntp } from './ntp.ts'
import type { outbound } from './outbound.ts'
import type { route } from './route.ts'

export interface typebox {
    log?: log
    dns?: dns
    endpoints?: endpoint[]
    inbounds?: inbound[]
    outbounds?: outbound[]
    route?: route
    experimental?: experimental
    ntp?: ntp
    certificate?: certificate
}
