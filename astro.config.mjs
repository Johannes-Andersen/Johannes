import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';

import icon from 'astro-icon';

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
        DISCORD_ID: envField.string({
          context: 'server',
          access: 'public',
          required: true,
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
    icon(),
  ],
  site: 'https://johand.dev',
});
