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
    "style-src 'self'; " +
    'upgrade-insecure-requests; block-all-mixed-content; sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups; ' +
    'report-uri https://johand.report-uri.com/r/d/csp/enforce; ' +
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
  response.headers.set('x-csp-nonce', nonce)

  return response
}

export const config = {
  matcher: '/:path*',
}
