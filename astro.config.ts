import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  prefetch: {
    prefetchAll: true,
  },
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
  image: {
    domains: ['johand.dev', 'cdn.discordapp.com'],
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
  site: 'https://johand.dev',
});
