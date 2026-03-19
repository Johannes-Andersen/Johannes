import process from 'node:process';

import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const isDev = import.meta.env.DEV;

export default defineConfig({
  output: 'server',
  // TODO: Remove the temp hack once Astro supports vitest out of the box in CF environment
  adapter: process.env.VITEST
    ? node({ mode: 'standalone' })
    : cloudflare({
        imageService: isDev ? 'passthrough' : 'cloudflare-binding',
        configPath: 'wrangler.jsonc',
        persistState: true,
      }),
  experimental: {
    chromeDevtoolsWorkspace: true,
    queuedRendering: {
      contentCache: true,
      enabled: true,
    },
    svgo: true,
    // cache: {
    //   provider: memoryCache({
    //     query: {
    //       sort: true,
    //     },
    //   }),
    // },
  },
  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        hostname: 'johand.dev',
        protocol: 'https',
      },
    ],
    // TODO: Investigate "require-trusted-types-for" and "trusted-types",
    csp: {
      algorithm: 'SHA-512',
      directives: [
        "default-src 'self'",
        "child-src 'self'",
        `base-uri ${isDev ? 'http://localhost:4321/' : 'https://johand.dev'}`,
        "img-src 'self' blob: data:",
        "manifest-src 'self'",
        "media-src 'self'",
        "worker-src 'self'",
        "form-action 'self'",
        "fenced-frame-src 'none'",
        "font-src 'self' data:",
        "object-src 'none'",
        "connect-src 'self' cloudflareinsights.com",
        "frame-ancestors 'none'",
        // 'upgrade-insecure-requests 1', // The Content Security Policy directive 'upgrade-insecure-requests' should be empty, but was delivered with a value of '1'. The directive has been applied, and the value ignored.
        "frame-src 'self' https://challenges.cloudflare.com",
        'sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups',
      ],
      styleDirective: {
        resources: ["'self'", ...(isDev ? ["'unsafe-inline'"] : [])],
      },
      scriptDirective: {
        resources: [
          "'self'",
          ...(isDev ? ["'unsafe-inline'"] : []),
          'https://challenges.cloudflare.com',
          'https://ajax.cloudflare.com',
          'https://static.cloudflareinsights.com',
        ],
        strictDynamic: false,
      },
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ['johand.dev', 'cdn.bsky.app'],
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
