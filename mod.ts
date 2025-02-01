import type { certificate } from './certificate.ts'
import type { dns } from './dns.ts'
import type { endpoint } from './endpoint.ts'
import type { experimental } from './experimental.ts'
import type { inbound } from './inbound.ts'
import type { log } from './log.ts'
import type { ntp } from './ntp.ts'
import type { outbound } from './outbound.ts'
import type { route } from './route.ts'

export interface typebox<
    O extends readonly outbound<O[number]['tag'] | E[number]['tag'], DS[number]['tag']>[] = never,
    E extends readonly endpoint<O[number]['tag'] | E[number]['tag'], DS[number]['tag']>[] = never,
    I extends readonly inbound<O[number]['tag'] | E[number]['tag'], DS[number]['tag'], I[number]['tag'] | E[number]['tag']>[] = never,
    DS extends readonly dns.server<O[number]['tag'], DS[number]['tag']>[] = never,
    RS extends readonly route.rule_set<O[number]['tag'] | E[number]['tag']>[] = never,
> {
    log?: log
    dns?: dns<O[number]['tag'] | E[number]['tag'], I[number]['tag'] | E[number]['tag'], RS[number]['tag'], DS>
    endpoints?: E
    inbounds?: I
    outbounds?: O
    route?: route<O[number]['tag'] | E[number]['tag'], I[number]['tag'] | E[number]['tag'], RS, DS[number]['tag']>
    experimental?: experimental
    ntp?: ntp<O[number]['tag'] | E[number]['tag'], DS[number]['tag']>
    certificate?: certificate
}

export const createTypebox = <
    const O extends readonly outbound<O[number]['tag'] | E[number]['tag'], DS[number]['tag']>[] = never,
    const E extends readonly endpoint<O[number]['tag'] | E[number]['tag'], DS[number]['tag']>[] = never,
    const I extends readonly inbound<O[number]['tag'] | E[number]['tag'], DS[number]['tag'], I[number]['tag'] | E[number]['tag']>[] = never,
    const DS extends readonly dns.server<O[number]['tag'], DS[number]['tag']>[] = never,
    const RS extends readonly route.rule_set<O[number]['tag'] | E[number]['tag']>[] = never,
>(typebox: typebox<O, E, I, DS, RS>) => typebox
