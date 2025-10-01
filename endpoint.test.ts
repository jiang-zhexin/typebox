import { createEndpoint, createEndpoints } from '@zhexin/typebox/endpoint'

const wg = createEndpoint({
    type: 'wireguard',
    tag: 'wg',
    address: '',
    listen_port: 0,
    peers: [],
    private_key: '',
    detour: 'aaa',
})

const _e = createEndpoints([
    wg,
    {
        type: 'wireguard',
        tag: 'aaa',
        address: '',
        listen_port: 0,
        peers: [],
        private_key: '',
    },
])
