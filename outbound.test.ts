import { createOutbound, createOutbounds } from './outbound.ts'

createOutbound(
    {
        tag: 'a',
        type: 'direct',
        // This error is used to check type safety
        detour: 'unkown-outbound',
    },
)

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
