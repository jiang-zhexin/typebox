import type * as outbound from './outbound.ts'
import type { duration } from './types.ts'

export interface ntp extends outbound.dialer {
    enabled: true
    interval?: duration
    write_to_system?: boolean
}
