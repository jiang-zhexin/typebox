import { createDnsServer, createDnsServers } from './dns.ts'

const _ali = createDnsServer({ type: 'https', tag: 'ali', address: '' })

const _dns_servers = createDnsServers([{
    tag: 'dns-server',
    type: 'https',
    server: '',
    // This error is used to check type safety
    domain_resolver: 'other-dns-server',
}])
