import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import clerk from '@clerk/astro';
import icon from 'astro-icon';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
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
        CLERK_PUBLISHABLE_KEY: envField.string({
          context: 'server',
          access: 'public',
          startsWith: 'pk_',
          optional: false,
        }),
        CLERK_SECRET_KEY: envField.string({
          context: 'server',
          access: 'secret',
          default: process.env.CLERK_SECRET_KEY,
        }),
      },
    },
  },
  image: {
    domains: ['johand.dev', 'cdn.discordapp.com'],
  },
  integrations: [
    react(),
    clerk(),
    tailwind({
      configFile: './tailwind.config.ts',
    }),
    sitemap(),
    icon(),
  ],
  site: 'https://johand.dev',
});
