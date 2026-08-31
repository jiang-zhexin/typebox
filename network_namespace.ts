/**
 * @module
 * The network namespace field.
 *
 * @example
 * ```ts
 * import { createNetworkNamespace } from "@zhexin/typebox/network_namespace"
 * ```
 */

import type { item_with_tag } from "./types.ts";

export function createNetworkNamespace(
  network_namespace: network_namespace,
): network_namespace {
  return network_namespace;
}

export type network_namespace =
  | default_namespace
  | unshare_namespace;

interface default_namespace extends item_with_tag<string> {
  type?: "default";
  path: string;
}

interface unshare_namespace extends item_with_tag<string> {
  type: "unshare";
  pid_file?: string;
}
