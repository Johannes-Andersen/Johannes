import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
      },
    ],
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
              'autoplay=(self)',
              'camera=()',
              'cross-origin-isolated=()',
              'display-capture=()',
              'encrypted-media=()',
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
            key: 'report-to',
            value: '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://johand.report-uri.com/a/d/g"}],"include_subdomains":true}',
          },
          {
            key: 'NEL',
            value: '{"report_to":"default","max_age":31536000,"include_subdomains":true}',
          }
        ],
      },
    ]
  },
}

export default nextConfig
