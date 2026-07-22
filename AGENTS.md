# TypeBox Agent Guide

## Project Overview

This project provides TypeScript type definitions for the entire [sing-box](https://github.com/SagerNet/sing-box) configuration. The project uses [Deno](https://deno.com/).

## Repository Structure

```
/
├── *.ts                   # TypeScript type definitions (one per config section)
├── *.test.ts              # Some type tests (use for `deno check **/*.ts`)
├── deno.json              # Deno/JSR package config
├── sing-box/              # Git submodule — upstream sing-box source
│   ├── option/            # Go structs that parse and validate config JSON
│   └── docs/
│       ├── changelog.md   # Upstream changelog
│       └── configuration/ # User-facing config documentation
└── .github/workflows/     # CI (deno check, fmt, lint)
```

## Key Source Files for Syncing

When syncing upstream changes, consult both sources for each config section:

| TypeScript file           | Go option file(s)                                                        | Docs directory                               |
| ------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| `mod.ts`                  | `option/options.go`                                                      | `configuration/index.md`                     |
| `inbound.ts`              | `option/inbound.go` + per-protocol files (e.g., `option/shadowsocks.go`) | `configuration/inbound/`                     |
| `outbound.ts`             | `option/outbound.go` + per-protocol files                                | `configuration/outbound/`                    |
| `dns.ts`                  | `option/dns.go` + `option/dns_record.go`                                 | `configuration/dns/`                         |
| `route.ts`                | `option/route.go` + `option/rule*.go`                                    | `configuration/route/`                       |
| `endpoint.ts`             | `option/endpoint.go` + per-endpoint files                                | `configuration/endpoint/`                    |
| `rule.ts`                 | `option/rule.go`                                                         | `configuration/rule/`                        |
| `rule_set.ts`             | `option/rule_set.go`                                                     | `configuration/rule-set/`                    |
| `tls.ts`                  | `option/tls.go`                                                          | `configuration/shared/tls.md`                |
| `transport.ts`            | `option/v2ray_transport.go` + `option/udp_over_tcp.go`                   | `configuration/shared/v2ray-transport.md`    |
| `certificate.ts`          | `option/certificate.go`                                                  | `configuration/certificate/`                 |
| `certificate_provider.ts` | `option/certificate_provider.go` + `option/acme.go`                      | `configuration/shared/certificate-provider/` |
| `http_client.ts`          | `option/http.go`                                                         | `configuration/shared/http-client.md`        |
| `network_namespace.ts`    | `option/netns.go`                                                        | `configuration/network-namespace/`           |
| `ntp.ts`                  | `option/ntp.go`                                                          | `configuration/ntp/`                         |
| `experimental.ts`         | `option/experimental.go`                                                 | `configuration/experimental/`                |
| `log.ts`                  | `option/options.go` (LogOptions)                                         | `configuration/log/`                         |
| `service.ts`              | `option/service.go`                                                      | `configuration/service/`                     |

## Mapping Go Structs to TypeScript Types

### Type Mappings

| Go type                     | TypeScript type                 | Notes                           |
| --------------------------- | ------------------------------- | ------------------------------- |
| `string`                    | `string`                        |                                 |
| `bool`                      | `boolean`                       |                                 |
| `uint16`, `uint32`, `int64` | `number`                        |                                 |
| `badoption.Duration`        | `duration` (from `types.ts`)    |                                 |
| `badoption.Listable[T]`     | `listable<T>` (from `types.ts`) |                                 |
| `badoption.Addr`            | `string`                        |                                 |
| `badoption.Prefixable`      | `string`                        |                                 |
| `badoption.Prefix`          | `string`                        |                                 |
| `NetworkList`               | `listable<network>`             |                                 |
| `DomainStrategy` enum       | `strategy` union type           |                                 |
| `*T` (pointer)              | `T?` (optional field)           | Omit if defaults are acceptable |

### JSON Tag Rules

- `json:"field_name"` → required field `field_name: type`
- `json:"field_name,omitempty"` → optional field `field_name?: type`
- `json:"-"` → ignored (internal field, do not include)

### Embedded Structs

Go embeds structs inline; in TypeScript, flatten those fields into the parent interface. For example, `DialerOptions` embedded in an outbound struct means all `DialerOptions` fields become direct fields of that outbound type.

### Enum-like Types

Go custom types with `MarshalJSON`/`UnmarshalJSON` methods define valid string values. Map these to TypeScript union types listing the allowed string literals. Examples: `DomainStrategy` → `"prefer_ipv4" | "prefer_ipv6" | "ipv4_only" | "ipv6_only"`.

## Project Conventions

### Tag fields are required

In sing-box, `tag` fields are optional (auto-generated if omitted). In TypeBox, **all tag fields are required**. This enables type-level tag cross-referencing and checking.

use `interface something<T extends string> extends item_with_tag<T> {...}` or `type something<T extends string> = item_with_tag<T> & {...}`

### `enabled` fields must be `true`

Any field named `enabled` must be literal `true`. Omit the entire parent block rather than setting `enabled: false`.

## Workflow: Syncing an Upstream Release

When the user says a new version is available (e.g., "1.14.0-alpha.50 is released"):

1. **Read the changelog**: Start with `sing-box/docs/changelog.md` to understand what changed at a high level.

2. **Identify affected files**: For each change, determine which Go option files and docs are affected.

3. **Read the upstream source**: Examine `sing-box/option/*.go` for the updated struct definitions. Focus on:
   - New fields added (including their JSON tags, types, and whether they are optional)
   - Removed or deprecated fields
   - Changed field types
   - New enum/union values

4. **Read the upstream docs**: Examine `sing-box/docs/configuration/` for the corresponding sections. Docs may provide additional context, defaults, and constraints not obvious from the Go code alone.

5. **Update TypeScript files**: Apply the changes following the mapping rules above. Keep the existing code style, module structure, and JSDoc comments. Add `@since` and `@deprecated` JSDoc tags where the upstream indicates a version change.

6. **Verify**: Run the following commands and fix any issues:
   ```
   deno check **/*.ts
   deno fmt **/*.ts
   deno lint
   ```

## Important Notes

- Never operate git directly. The user handles submodule updates.
- Do not modify `sing-box/` contents — it is a read-only upstream reference.
- Test files (`*.test.ts`) serve as compile-time type checks (`deno check **/*.ts`). Add new test cases when adding significant new types.
- The project intentionally differs from sing-box config in some ways: required tags, required `enabled: true` (see README.md "Standard" section).
