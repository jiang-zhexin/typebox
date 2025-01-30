import type { action_reject, base_logical_rule, default_rule_with_metadata } from './rule.ts'
import type { client_tls } from './tls.ts'
import type { dialer, duration, item_with_tag, listable, options, resolver, strategy } from './types.ts'
import type { headers } from './types.ts'

export interface dns {
    servers?: dns.server[]
    rules?: rule[]
    final?: string
    reverse_mapping?: boolean
    strategy?: strategy
    disable_cache?: boolean
    disable_expire?: boolean
    independent_cache?: boolean
    cache_capacity?: number
    client_subnet?: string
    /**
     * @deprecated Legacy fake-ip configuration is deprecated and will be removed in sing-box 1.14.0
     * @since 1.12.0
     */
    fakeip?: fakeip
}

export declare namespace dns {
    export type server = legacy | local | tcp | udp | tls | quic | https | h3 | predefined | dhcp | fakeip
    export namespace server {
        export { dhcp, fakeip, h3, https, legacy, local, predefined, quic, tcp, tls, udp }
    }
    export { rule }
    /**
     * @deprecated Legacy DNS servers is deprecated and will be removed in sing-box 1.14.0
     * @since 1.12.0
     */
    interface legacy extends item_with_tag {
        address: string
        address_resolver?: string
        address_strategy?: string
        address_fallback_delay?: duration
        strategy?: strategy
        detour?: string
        client_subnet?: string
    }
    interface local extends dialer, item_with_tag {
        type: 'local'
    }
    interface tcp extends dialer, item_with_tag {
        type: 'tcp'
        server: string
        /**
         * @default 53
         */
        server_port?: number
    }
    interface udp extends dialer, item_with_tag {
        type: 'udp'
        server: string
        /**
         * @default 53
         */
        server_port?: number
    }
    interface tls extends dialer, item_with_tag {
        type: 'tls'
        server: string
        /**
         * @default 853
         */
        server_port?: number
        tls?: client_tls
    }
    interface quic extends dialer, item_with_tag {
        type: 'quic'
        server: string
        /**
         * @default 853
         */
        server_port?: number
        tls?: client_tls
    }
    interface https extends dialer, item_with_tag {
        type: 'https'
        server: string
        /**
         * @default 443
         */
        server_port?: number
        /**
         * @default /dns-query
         */
        path?: string
        headers?: headers
        tls?: client_tls
    }
    interface h3 extends dialer, item_with_tag {
        type: 'h3'
        server: string
        /**
         * @default 443
         */
        server_port?: number
        /**
         * @default /dns-query
         */
        path?: string
        headers?: headers
        tls?: client_tls
    }
    interface predefined extends item_with_tag {
        type: 'predefined'
        responses: response[]
    }
    interface dhcp extends dialer, item_with_tag {
        type: 'dhcp'
        interface?: string
    }
    interface fakeip extends item_with_tag {
        type: 'fakeip'
        /**
         * @example 198.18.0.0/15
         */
        inet4_range: string
        /**
         * @example fc00::/18
         */
        inet6_range: string
    }
}

interface response {
    query?: listable<string>
    query_type?: listable<string>
    /**
     * @default NOERROR
     */
    rcode?: 'NOERROR' | 'FORMERR' | 'SERVFAIL' | 'NXDOMAIN' | 'NOTIMP' | 'REFUSED'
    /**
     * @example localhost. IN A 127.0.0.1
     * @example localhost. IN AAAA ::1
     * @example localhost. IN TXT \"Hello\"
     */
    answer?: listable<string>
    ns?: listable<string>
    extra?: listable<string>
}

interface fakeip {
    enabled: true
    inet4_range: string
    inet6_range: string
}

type rule = rule_item & action
type rule_item = default_rule | logical_rule
type action = action_route | action_route_options | action_reject
interface action_route extends resolver {
    action?: 'route'
}
interface action_route_options extends options {
    action: 'route-options'
}
interface default_rule extends default_rule_with_metadata {
    query_type?: listable<string | number>
    /**
     * @deprecated outbound rule items are deprecated and will be removed in sing-box 1.14.0
     * @since 1.12.0
     */
    outbound?: listable<string>
}
interface logical_rule extends base_logical_rule {
    rules: rule[]
}
