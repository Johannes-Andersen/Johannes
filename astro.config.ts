import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const isDev = import.meta.env.DEV;

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.jsonc',
      persist: true,
    },
  }),
  // TODO: Investigate "require-trusted-types-for" and "trusted-types",
  experimental: {
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
        // "frame-ancestors 'none'", // The Content Security Policy directive 'frame-ancestors' is ignored when delivered via a <meta> element.
        // 'upgrade-insecure-requests 1', // The Content Security Policy directive 'upgrade-insecure-requests' should be empty, but was delivered with a value of '1'. The directive has been applied, and the value ignored.
        "frame-src 'self' https://challenges.cloudflare.com",
        // 'sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups', // The Content Security Policy directive 'sandbox' is ignored when delivered via a <meta> element.
      ],
      styleDirective: {
        resources: ['self', ...(isDev ? ['unsafe-inline'] : [])],
      },
      scriptDirective: {
        resources: [
          'self',
          ...(isDev ? ['unsafe-inline'] : []),
          "self' https://challenges.cloudflare.com 'self", // TODO: Remove 'self' bypass
          "self' https://ajax.cloudflare.com 'self", // TODO: Remove 'self' bypass
          "self' https://static.cloudflareinsights.com 'self", // TODO: Remove 'self' bypass
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
