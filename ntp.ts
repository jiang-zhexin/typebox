import type { dialer, duration } from './types.ts'

export interface ntp extends dialer {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
