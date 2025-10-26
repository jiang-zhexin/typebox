import { createNtp } from '@zhexin/typebox/ntp'

const _ = createNtp({
    enabled: true,
    server: '',
    server_port: 0,
    domain_resolver: 'dns-server',
    detour: 'outbound',
})
