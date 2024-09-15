import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    env: {
      schema: {
        DISCORD_SNOWFLAKE: envField.string({
          context: 'server',
          access: 'public',
          optional: false,
          max: 19,
          min: 17,
        }),
      },
    },
  },
  image: {
    domains: ['johand.dev', 'cdn.discordapp.com'],
  },
  integrations: [
    tailwind({
      configFile: './tailwind.config.ts',
    }),
    sitemap(),
  ],
  site: 'https://johand.dev',
});
