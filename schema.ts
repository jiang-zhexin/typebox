import type { certificate } from "./certificate.ts";
import type { certificate_provider } from "./certificate_provider.ts";
import type { dns } from "./dns.ts";
import type { endpoint } from "./endpoint.ts";
import type { experimental } from "./experimental.ts";
import type { http_client } from "./http_client.ts";
import type { inbound } from "./inbound.ts";
import type { log } from "./log.ts";
import type { network_namespace } from "./network_namespace.ts";
import type { ntp } from "./ntp.ts";
import type { outbound } from "./outbound.ts";
import type { route } from "./route.ts";
import type { rule_set } from "./rule_set.ts";
import type { service } from "./service.ts";
import type { non_empty_array } from "./types.ts";

export interface schema {
  $schema?: string;
  log?: log;
  dns?: dns<
    string,
    string,
    string,
    string,
    string,
    string
  >;
  endpoints?: non_empty_array<endpoint<string, string, string>>;
  inbounds?: non_empty_array<
    inbound<string, string, string, string, string, string, string>
  >;
  outbounds?: non_empty_array<outbound<string, string, string, string>>;
  route?: route<
    string,
    string,
    string,
    string,
    string,
    string
  >;
  services?: non_empty_array<
    service<string, string, string, string, string, string>
  >;
  experimental?: experimental;
  ntp?: ntp<string, string>;
  certificate?: certificate;
  certificate_providers?: certificate_provider<
    string,
    string,
    string,
    string
  >[];
  http_clients?: non_empty_array<http_client<string, string, string>>;
  network_namespaces?: non_empty_array<network_namespace>;
}

export type rule_set_schema = { $schema?: string } & rule_set;
