import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.json',
      persist: {
        path: './.cache/wrangler/v3',
      },
    },
  }),
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ['johand.dev', 'cdn.discordapp.com'],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
    },
  },
  integrations: [sitemap()],
  site: 'https://johand.dev',
});
