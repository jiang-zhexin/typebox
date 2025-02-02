import { createDnsServer, createDnsServers } from './dns.ts'

createDnsServer({
    type: 'https',
    tag: 'ali',
    server: '',
    // This error is used to check type safety
    domain_resolver: 'unkown-dns-server',
    // This error is used to check type safety
    detour: 'unkown-outbound',
}, { assertExistDnsServers: ['other-dns-server'], assertExistOutbounds: ['c'] })

const _ali = createDnsServer({
    type: 'https',
    tag: 'ali',
    server: '223.5.5.5',
    domain_resolver: 'other-dns-server',
    detour: 'c',
}, { assertExistDnsServers: ['other-dns-server'], assertExistOutbounds: ['c'] })

createDnsServer({
    tag: 'ali',
    address: '',
    // This error is used to check type safety
    address_resolver: 'unkown-dns-server',
}, { assertExistDnsServers: ['other-dns-server'], assertExistOutbounds: ['c'] })

const _dns_servers = createDnsServers([{
    tag: 'dns-server',
    type: 'https',
    server: '',
    domain_resolver: 'other-dns-server',
}], { assertExistDnsServers: ['other-dns-server'] })
