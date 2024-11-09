### Types for the sing-box config
This project provides TypeScript types for the entire sing-box config.

### How to use?
##### For deno
Add Package
```bash
deno add jsr:@zhexin/typebox
```
Import symbol
```TypeScript
import { typebox } from "@zhexin/typebox"

let config: typebox = {
    log: {},
    ntp: {},
    dns: {},
    inbounds: [],
    outbounds: [],
    route: {},
    experimental: {}
}
```

##### For node
```bash
pnpm dlx jsr add @zhexin/typebox
```
Import symbol
```TypeScript
import { typebox } from "@zhexin/typebox"
```

### About version
This project does not follow semantic versioning in the traditional sense. Instead, it follows the versioning of sing-box.

For example, 1.10.x provides TypeScript types for sing-box 1.10.x.

However, the 'x' is independent of the sing-box version and is used for revisions of this project itself.
