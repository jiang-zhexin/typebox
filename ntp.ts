import type { dialer, duration } from './types.ts'

export const createNtp = <
    const N extends ntp<OT[number], DS[number]>,
    const OT extends readonly string[] = never,
    const DS extends readonly string[] = never,
>(n: N, _options?: {
    assertExistOutbounds?: OT
    assertExistDnsServers?: DS
}) => n

export interface ntp<
    O extends string = never,
    DS extends string = never,
> extends dialer<O, DS> {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
