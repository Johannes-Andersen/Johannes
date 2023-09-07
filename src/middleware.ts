import { NextRequest, NextResponse } from 'next/server'

export function middleware(_request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const cspHeader = `
    default-src 'self';
    script-src 'self' challenges.cloudflare.com ajax.cloudflare.com static.cloudflareinsights.com ${
      process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    } 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src 'self' cloudflareinsights.com wss://api.lanyard.rest;
    report-uri https://johand.report-uri.com/r/d/csp/enforce;
    frame-ancestors 'none';
    frame-src https://challenges.cloudflare.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
    sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups;
`

  const requestHeaders = new Headers()
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/:path*',
}
