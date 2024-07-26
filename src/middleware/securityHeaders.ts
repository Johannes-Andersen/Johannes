import { defineMiddleware } from 'astro:middleware';

function setDefault(headers: Headers, key: string, value: string) {
  if (!headers.has(key)) {
    headers.set(key, value);
  }
}

// Lax CSP for now, the unsafe-inline should really be removed.
const cspDirectives = [].filter(Boolean).join(' ');

const securityHeaders = defineMiddleware(async (_, next) => {
  const response = await next();
  const { headers } = response;

  return response;
});

export default securityHeaders;
