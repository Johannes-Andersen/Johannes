require('./env.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.discordapp.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
