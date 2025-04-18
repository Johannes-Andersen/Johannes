import { sequence } from 'astro:middleware';

import { cacheHeaders } from './cacheHeaders.ts';
import { cloudflareCache } from './cloudflareCache.ts';
import { securityHeaders } from './securityHeaders.ts';

const middleware = () =>
  sequence(cloudflareCache, securityHeaders, cacheHeaders);

export const onRequest = middleware();
