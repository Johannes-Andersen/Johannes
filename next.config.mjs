import './src/env.mjs'

const generateCsp = () => {
  const csp = [
    {
      name: 'default-src',
      values: ["'self'"],
    },
    {
      name: 'script-src',
      values: [
        "'self'",
        process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : '',
        // TODO: debug why this is needed (nonces are not working for some reason)
        "'unsafe-inline'",
        'ajax.cloudflare.com',
        'static.cloudflareinsights.com',
        'challenges.cloudflare.com',
      ],
    },
    {
      name: 'style-src',
      // FIXME: disable unsafe-inline when https://github.com/vercel/next.js/issues/46857 is fixed
      values: ["'self'", "'unsafe-inline'"],
    },
    {
      name: 'connect-src',
      values: ["'self'", 'wss://api.lanyard.rest', 'cloudflareinsights.com'],
    },
    { name: 'frame-src', values: ['challenges.cloudflare.com'] },
    { name: 'frame-ancestors', values: ["'none'"] },
    { name: 'object-src', values: ["'none'"] },
  ]

  const cspString = csp
    .map((directive) => {
      return `${directive.name} ${directive.values.join(' ')}`
    })
    .join('; ')

  return cspString
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ['cdn.discordapp.com'],
    formats: ['image/avif', 'image/webp'],
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: [
              'browsing-topics=()',
              'accelerometer=()',
              'ambient-light-sensor=()',
              'autoplay=(self)',
              'camera=()',
              'cross-origin-isolated=()',
              'display-capture=()',
              'encrypted-media=()',
              'execution-while-not-rendered=()',
              'execution-while-out-of-viewport=()',
              'fullscreen=(self)',
              'geolocation=()',
              'gyroscope=()',
              'keyboard-map=()',
              'magnetometer=()',
              'microphone=()',
              'midi=()',
              'payment=()',
              'picture-in-picture=(self)',
              'publickey-credentials-get=()',
              'screen-wake-lock=()',
              'sync-xhr=(self)',
              'usb=()',
              'xr-spatial-tracking=()',
              'clipboard-read=(self)',
              'clipboard-write=(self)',
              'gamepad=()',
              'hid=()',
              'idle-detection=()',
              'unload=()',
            ].join(', '),
          },
          {
            key: 'referrer-policy',
            value: 'strict-origin',
          },
          {
            key: 'x-content-type-options',
            value: 'nosniff',
          },
          {
            key: 'x-frame-options',
            value: 'DENY',
          },
          {
            key: 'x-xss-protection',
            value: '1; mode=block',
          },
          {
            key: 'cross-origin-opener-policy',
            value: 'same-origin',
          },
          {
            key: 'cross-origin-resource-policy',
            value: 'same-origin',
          },
          {
            key: 'cross-origin-embedder-policy',
            value: 'require-corp',
          },
          {
            key: 'content-security-policy',
            value: generateCsp(),
          },
        ],
      },
    ]
  },
}

export default nextConfig
