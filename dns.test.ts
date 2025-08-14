import { createDnsServers } from './dns.ts'

createDnsServers([{
    tag: 'dns-server',
    type: 'https',
    server: '',
    // This error is used to check type safety
    domain_resolver: 'other-dns-server',
}])
