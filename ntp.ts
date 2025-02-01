import type { dialer, duration } from './types.ts'

export interface ntp<
    O extends string = never,
    DS extends string = never,
> extends dialer<O, DS> {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
