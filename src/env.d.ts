/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly DISCORD_SNOWFLAKE?: `${bigint}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
