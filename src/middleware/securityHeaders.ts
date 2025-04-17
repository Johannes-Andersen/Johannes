import { defineMiddleware } from 'astro:middleware';

function setDefault(headers: Headers, key: string, value: string) {
  if (!headers.has(key)) {
    headers.set(key, value);
  }
}

// Lax CSP for now, the unsafe-inline should really be removed. (Pending astro proposal https://github.com/withastro/roadmap/issues/1149)
const cspDirectives = [
  "default-src 'self';",
  "img-src 'self' blob: data:;",
  "script-src 'self' 'unsafe-inline' challenges.cloudflare.com ajax.cloudflare.com static.cloudflareinsights.com;",
  "style-src 'self' 'unsafe-inline';",
  "font-src 'self' data:;",
  "object-src 'none';",
  "connect-src 'self' cloudflareinsights.com;",
  "frame-ancestors 'none';",
  'block-all-mixed-content;',
  'frame-src https://challenges.cloudflare.com;',
  'sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-popups;',
]
  .filter(Boolean)
  .join(' ');

const securityHeaders = defineMiddleware(async (_, next) => {
  const response = await next();
  const { headers } = response;

  // Only set headers for HTML documents.
  const contentType = headers.get('content-type');
  if (contentType && !contentType.includes('text/html')) {
    return response;
  }

  // Enable browsers built-in XSS protection.
  setDefault(headers, 'x-xss-protection', '1; mode=block');
  // Prevent browsers from sniffing MIME types. This is to prevent MIME Confusion Attack.
  setDefault(headers, 'x-content-type-options', 'nosniff');
  // The browser will only set the referrer header on requests to the same origin.
  // If the destination is another origin then no referrer information will be sent.
  // https://scotthelme.co.uk/a-new-security-header-referrer-policy/
  setDefault(headers, 'referrer-policy', 'same-origin');
  // Prevents the website from being iframed.
  setDefault(headers, 'x-frame-options', 'DENY');
  // Permission policy, disable features that we are not using to limit the attack surface.
  setDefault(
    headers,
    'permissions-policy',
    [
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
  );

  setDefault(headers, 'cross-origin-opener-policy', 'same-origin');
  setDefault(headers, 'cross-origin-resource-policy', 'same-origin');
  setDefault(headers, 'cross-origin-embedder-policy', 'require-corp');

  // Content Security Policy
  setDefault(headers, 'content-security-policy', cspDirectives);

  return response;
});

export default securityHeaders;
