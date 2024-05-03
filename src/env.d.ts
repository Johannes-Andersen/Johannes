/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly DISCORD_ID?: `${bigint}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
