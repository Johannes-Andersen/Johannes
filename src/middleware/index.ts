import { sequence } from 'astro:middleware';

import cacheHeaders from './cacheHeaders';
import cloudflareCache from './cloudflareCache';
import securityHeaders from './securityHeaders';

const middleware = () =>
  sequence(cloudflareCache, securityHeaders, cacheHeaders);

export const onRequest = middleware();
