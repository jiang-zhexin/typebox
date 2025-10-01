import { createOutbound, createOutbounds } from './outbound.ts'

const a = createOutbound({
    tag: 'a',
    type: 'direct',
    detour: 'aa',
    domain_resolver: 'c',
})

const aa = createOutbound({
    tag: 'aa',
    type: 'direct',
    // detour: 'b',
    domain_resolver: 'c',
})

const _os = createOutbounds([
    a,
    aa,
    {
        type: 'selector',
        tag: 'b',
        outbounds: [
            'a',
        ],
    },
    {
        tag: 'aaaa',
        type: 'direct',
    },
])
