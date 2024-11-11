import type { duration } from './types.ts'
import type { dialer } from './outbound.ts'

export interface ntp extends dialer {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
