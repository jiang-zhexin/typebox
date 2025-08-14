import { createOutbounds } from './outbound.ts'

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
