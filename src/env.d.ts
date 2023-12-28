/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DISCORD_ID?: `${bigint}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
