# Types for the sing-box config
[![JSR Scope](https://jsr.io/badges/@zhexin)](https://jsr.io/@zhexin) [![JSR](https://jsr.io/badges/@zhexin/typebox)](https://jsr.io/@zhexin/typebox) [![JSR Score](https://jsr.io/badges/@zhexin/typebox/score)](https://jsr.io/@zhexin/typebox)

This project provides TypeScript types for the entire sing-box config.

## How to use?
### For Deno
Install Deno
```bash
# Windows
irm https://deno.land/install.ps1 | iex
# MacOS/Linux
curl -fsSL https://deno.land/install.sh | sh
```
Init
```bash
deno init singconf
cd singconf
deno add jsr:@zhexin/typebox
```
Coding
```TypeScript
// main.ts
import { typebox } from "@zhexin/typebox"
import { outbound } from "@zhexin/typebox/outbound"

const ss: outbound.shadowsocks = {
    type: "shadowsocks",
    tag: "ss-out",
    method: "2022-blake3-aes-128-gcm",
    password: "",
    server: "",
    server_port: 11451,
    multiplex: {
        enabled: true,
    },
}

const config: typebox = {
    log: {},
    dns: {},
    endpoints: [],
    inbounds: [],
    outbounds: [ss],
    route: {},
    experimental: {},
}

// export to .json file
await Deno.writeTextFile("./path/to/config.json", JSON.stringify(config, null, 4))
```
Run it
```bash
deno run --allow-write ./main.ts
```

### For Node.js
```bash
npx jsr add @zhexin/typebox
# or
yarn dlx jsr add @zhexin/typebox
# or
pnpm dlx jsr add @zhexin/typebox
```
Import
```TypeScript
import { typebox } from "@zhexin/typebox"

```
### For Bun
```bash
bunx jsr add @zhexin/typebox
```
Import
```TypeScript
import { typebox } from "@zhexin/typebox"
```

## About version
This project does not follow semantic versioning in the traditional sense. Instead, it follows the versioning of sing-box.

For example, 1.10.x provides TypeScript types for sing-box 1.10.x.

However, the "x" is independent of the sing-box version and is used for revisions of this project itself.

## Standard
Here are the differences from the sing-box acceptable configuration. 

The differences are **intentional**.

### Tag
The value of any tag field like `dns.server.tag` or `outbound.tag` is required, even though it's optional in sing-box.

### Deprecated
Any field marked as `deprecated` will not appear, even though it is available in the current version.

### Enabled
Any `enabled` field must be true.

if you are not enabling it, you should omit the entire field.
