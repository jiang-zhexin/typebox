# Types for the sing-box config

[![JSR](https://jsr.io/badges/@zhexin/typebox)](https://jsr.io/@zhexin/typebox)

This project provides TypeScript types for the entire sing-box config.

## Why Use TypeBox?

- **Type Safety**: TypeBox provides a robust type system that ensures your configurations are type-safe, reducing errors.
- **Auto-completion**: With TypeBox, you get auto-completion features in your IDE, making it easier to write and maintain configurations.
- **Modular Design**: TypeBox allows you to create modular configurations, enabling better organization and reuse of configuration components.
- **Tag Checking**: TypeBox supports tag checking, ensuring that all required tags are present in your configurations.

## Try TypeBox in browser

You can try TypeBox in browser: [TypeBox Playground](https://typebox.zhexin.org). It runs entirely in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

> [!IMPORTANT]
> All data is stored in your browser's local storage, so it won't be sent to any server.

## How to use?

| Feature Matrix | JSON Schema | TypeScript |
| -------------- | ----------- | ---------- |
| Auto complete  | ✔️           | ✔️          |
| Modular        | ❌           | ✔️          |
| Tag check      | ❌           | ✔️          |

### Use in JSON schema

```jsonc
{
    "$schema": "https://github.com/jiang-zhexin/typebox/releases/latest/download/schema.json",
    // other sing-box config
}
```

### Use in TypeScript

```bash
# Node.js
npx jsr add @zhexin/typebox
yarn add jsr:@zhexin/typebox
pnpm add jsr:@zhexin/typebox
# Deno
deno add jsr:@zhexin/typebox
# Bun
bunx jsr add @zhexin/typebox
```

Coding

```ts
// main.ts
import { createTypebox } from "@zhexin/typebox"
import { createOutbound } from "@zhexin/typebox/outbound"

const ss_out = createOutbound({
    type: 'shadowsocks',
    tag: 'ss-out',
    method: '2022-blake3-aes-128-gcm',
    password: '',
    server: '',
    server_port: 0,
    multiplex: {
        enabled: true,
    },
})

const config = createTypebox({
    log: {},
    dns: {},
    endpoints: [],
    inbounds: [],
    outbounds: [ss_out],
    route: {},
    experimental: {},
})

// export to .json file
await Deno.writeTextFile("./path/to/config.json", JSON.stringify(config, null, 4))
```

Run it

```bash
deno run --allow-write ./main.ts
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

### Enabled

Any `enabled` field must be true.

if you are not enabling it, you should omit the entire field.
