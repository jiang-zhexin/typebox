import { createInbound, createInbounds } from './inbound.ts'

createInbounds([{
    type: 'shadowsocks',
    tag: 'b',
    listen: '',
    listen_port: 80,
    password: '',
    method: '2022-blake3-aes-128-gcm',
    // This error is used to check type safety
    detour: '',
}])

const _ss_in = createInbound({
    type: 'shadowsocks',
    tag: 'b',
    listen: '',
    listen_port: 80,
    password: '',
    method: '2022-blake3-aes-128-gcm',
    detour: 'c',
}, { assertExistInbounds: ['c'] })
