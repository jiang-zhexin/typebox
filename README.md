# Types for the sing-box config
This project provides TypeScript types for the entire sing-box config.

## How to use?
### For deno
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

### For node
```bash
pnpm dlx jsr add @zhexin/typebox
```
Import symbol
```TypeScript
import { typebox } from "@zhexin/typebox"
```

## About version
This project does not follow semantic versioning in the traditional sense. Instead, it follows the versioning of sing-box.

For example, 1.10.x provides TypeScript types for sing-box 1.10.x.

However, the 'x' is independent of the sing-box version and is used for revisions of this project itself.

## Standard
Here are the differences from the sing-box acceptable configuration. 

The differences are **intentional**.

### Tag
The value of any tag field like `dns.server.tag` or `outbound.tag` is required, even though it's optional in sing-box.

### Deprecated
Any field marked as `deprecated` will not appear, even though it is available in the current version.

### Enabled
Any `Enabled` field must be true.

if you are not enabling it, you should omit the entire field.
