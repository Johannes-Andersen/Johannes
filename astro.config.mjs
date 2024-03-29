import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  prefetch: {
    prefetchAll: true,
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
