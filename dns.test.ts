import { createDnsRule, createDnsServer, createDnsServers } from './dns.ts'

const a = createDnsServer({
    tag: 'a',
    type: 'https',
    server: '',
    domain_resolver: 'aaa',
})

const doh = createDnsServer({
    tag: 'dns-server',
    type: 'https',
    server: '',
})

const fakeip = createDnsServer({
    tag: 'aaa',
    type: 'fakeip',
    inet4_range: '',
    inet6_range: '',
})

const _ds = createDnsServers([
    a,
    doh,
    fakeip,
])

const _dr = createDnsRule({
    rule_set: ['111'],
    server: '111',
})
