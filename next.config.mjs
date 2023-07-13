import './src/env.mjs'

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
              'unload=()'
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
        ],
      },
    ]
  }
}

export default nextConfig
