import type { listable } from './types.ts'

export interface certificate {
    /**
     * @default system
     */
    store?: 'system' | 'mozilla' | 'none'
    certificate?: listable<string>
    certificate_path?: listable<string>
    certificate_directory_path?: listable<string>
}
