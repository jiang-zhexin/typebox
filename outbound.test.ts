import { createOutbound, createOutbounds } from './outbound.ts'

createOutbound(
    {
        tag: 'a',
        type: 'direct',
        // This error is used to check type safety
        detour: 'unkown-outbound',
    },
)

const _b = createOutbound({ tag: 'a', type: 'direct' })

createOutbounds([
    {
        tag: 'a',
        type: 'direct',
    },
    {
        type: 'selector',
        tag: 'b',
        // This error is used to check type safety
        outbounds: [
            'unkown-outbound',
        ],
    },
])

createOutbound({
    tag: 'a',
    type: 'direct',
    // This error is used to check type safety
    detour: '',
    domain_resolver: '',
}, { assertExistOutbounds: ['c'], assertExistDnsServers: ['b'] })

const _a = createOutbound({ tag: 'a', type: 'direct', detour: 'c' }, { assertExistOutbounds: ['c'] })

const _g = createOutbounds([
    { tag: 'a', type: 'direct', domain_resolver: 'local-dns' },
], { assertExistDnsServers: ['local-dns', 'remote-dns'] })
