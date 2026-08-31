/**
 * @module
 * The experimental field.
 *
 * @example
 * ```ts
 * import { createExperimental, createCacheFile, createClashApi, createV2rayApi } from "@zhexin/typebox/experimental"
 * ```
 */

import type { duration, listable, memory_bytes } from "./types.ts";

export function createExperimental(e: experimental): experimental {
  return e;
}

export function createCacheFile(c: cache_file): cache_file {
  return c;
}

export function createClashApi(c: clash_api): clash_api {
  return c;
}

export function createV2rayApi(v: v2ray_api): v2ray_api {
  return v;
}

/**
 * You should not use this directly, instead use {@link createExperimental}.
 */
export interface experimental {
  cache_file?: cache_file;
  clash_api?: clash_api;
  v2ray_api?: v2ray_api;
  debug?: debug;
}

interface cache_file {
  enabled: true;
  path?: string;
  cache_id?: string;
  store_fakeip?: boolean;
  /**
   * @deprecated store_rdrc is deprecated and will be removed in sing-box 1.16.0
   * @since 1.14.0
   */
  store_rdrc?: boolean;
  store_dns?: boolean;
  rdrc_timeout?: duration;
}

interface clash_api {
  external_controller?: string;
  external_ui?: string;
  external_ui_download_url?: string;
  external_ui_download_detour?: string;
  secret?: string;
  default_mode?: string;
  access_control_allow_origin?: listable<string>;
  access_control_allow_private_network?: boolean;
}

interface v2ray_api {
  listen?: string;
  stats?: {
    enabled: true;
    inbounds?: string[];
    outbounds?: string[];
    users?: string[];
  };
}

interface debug {
  listen?: string;
  gc_percent?: number;
  max_stack?: number;
  max_threads?: number;
  panic_on_fault?: boolean;
  trace_back?: string;
  memory_limit?: memory_bytes;
  oom_killer?: boolean;
}
