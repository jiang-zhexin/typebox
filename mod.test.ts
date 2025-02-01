import { createDnsServer } from './dns.ts'
import { createInbound } from './inbound.ts'
import { createTypebox } from './mod.ts'
import { createOutbound, createOutbounds } from './outbound.ts'
import { createRule, createRuleSet } from './route.ts'

const rule_set_block = createRuleSet({
    tag: 'block',
    type: 'remote',
    format: 'binary',
    url: '',
})
const rule_set_proxy = createRuleSet({
    tag: 'proxy',
    type: 'remote',
    format: 'binary',
    url: '',
})
const rule_set_direct = createRuleSet({
    tag: 'direct',
    type: 'remote',
    format: 'binary',
    url: '',
})

const ali_dns = createDnsServer({
    tag: 'ali-dns',
    type: 'https',
    server: '223.5.5.5',
})
const fakeip = createDnsServer({
    tag: 'fakeip',
    type: 'fakeip',
    inet4_range: '198.18.0.0/15',
    inet6_range: 'fc00::/18',
})
const block_dns = createDnsServer({
    tag: 'block-dns',
    address: 'rcode://success',
})

const tun_in = createInbound({
    tag: 'tun-in',
    type: 'tun',
    interface_name: 'sing-box',
    address: ['172.19.0.1/30', 'fdfe:dcba:9876::1/126'],
    auto_route: true,
    stack: 'system',
})

const direct_out = createOutbound({
    tag: 'direct-out',
    type: 'direct',
})

const ss_out = createOutbound({
    tag: 'ss-out',
    type: 'shadowsocks',
    method: '2022-blake3-aes-128-gcm',
    password: '',
    server: '',
    server_port: 0,
})

const outbounds = createOutbounds([
    {
        tag: 'final',
        type: 'selector',
        outbounds: ['direct-out', 'proxy'],
    },
    {
        tag: 'proxy',
        type: 'selector',
        outbounds: ['ss-out', 'direct-out'],
    },
    direct_out,
    ss_out,
])

const rule_hijack_dns = createRule({
    port: 53,
    action: 'hijack-dns',
})

createTypebox({
    log: {
        level: 'warn',
        output: 'stdout',
    },
    dns: {
        servers: [ali_dns, fakeip, block_dns],
        rules: [
            {
                outbound: 'any',
                server: ali_dns.tag,
            },
            {
                rule_set: rule_set_block.tag,
                server: block_dns.tag,
            },
            { // This error is used to check type safety
                rule_set: 'unkown-rule-set',
                server: 'unkown-dns-server',
            },
            {
                rule_set: rule_set_direct.tag,
                server: ali_dns.tag,
            },
            {
                query_type: 'HTTPS',
                rule_set: 'proxy',
                server: block_dns.tag,
            },
            {
                query_type: ['A', 'AAAA'],
                rule_set: 'proxy',
                server: fakeip.tag,
            },
        ],
        final: ali_dns.tag,
    },
    route: {
        rule_set: [
            {
                ...rule_set_block,
                download_detour: 'direct-out',
            },
            rule_set_direct,
            rule_set_proxy,
        ],
        rules: [
            rule_hijack_dns,
            {
                rule_set: 'block',
                action: 'reject',
            },
            { // This error is used to check type safety
                rule_set: 'unkown-rule-set',
                action: 'reject',
            },
            {
                rule_set: rule_set_direct.tag,
                outbound: direct_out.tag,
            },
            {
                rule_set: rule_set_proxy.tag,
                outbound: 'proxy',
            },
        ],
        final: 'final',
    },
    inbounds: [
        tun_in,
    ],
    outbounds: outbounds,
})
