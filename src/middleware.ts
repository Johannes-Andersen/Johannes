import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  let cspValue =
    "default-src 'self'; " +
    "frame-ancestors 'none'; " +
    'frame-src https://challenges.cloudflare.com; ' +
    "form-action 'self'; " +
    "connect-src 'self' cloudflareinsights.com wss://api.lanyard.rest; " +
    "base-uri 'self'; " +
    "object-src 'none'; " +
    // FIXME: disable unsafe-inline when https://github.com/vercel/next.js/issues/46857 is fixed
    "style-src 'self' 'unsafe-inline'; " +
    'upgrade-insecure-requests; block-all-mixed-content; sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups; ' +
    `script-src 'self' challenges.cloudflare.com ajax.cloudflare.com static.cloudflareinsights.com ${
      process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    }`

  const nonce = crypto.randomUUID()

  cspValue += ` 'nonce-${nonce}' 'strict-dynamic'`

  requestHeaders.set('content-security-policy', cspValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('content-security-policy', cspValue)

  return response
}

export const config = {
  matcher: '/:path*',
}
