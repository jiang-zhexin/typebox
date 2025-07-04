import type { certificate } from './certificate.ts'
import type { dns } from './dns.ts'
import type { endpoint } from './endpoint.ts'
import type { experimental } from './experimental.ts'
import type { inbound } from './inbound.ts'
import type { log } from './log.ts'
import type { ntp } from './ntp.ts'
import type { outbound } from './outbound.ts'
import type { route } from './route.ts'
import type { service } from './service.ts'

export interface schema {
    $schema: string
    log?: log
    dns?: dns<string, string, string, string, dns.server<string, string, string>[]>
    endpoints?: endpoint<string, string>[]
    inbounds?: inbound<string, string, string, string>[]
    outbounds?: outbound<string, string>[]
    route?: route<string, string, route.rule_set<string>[], string>
    services?: service[]
    experimental?: experimental
    ntp?: ntp<string, string>
    certificate?: certificate
}
