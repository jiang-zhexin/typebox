import { createInbounds } from './inbound.ts'

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
