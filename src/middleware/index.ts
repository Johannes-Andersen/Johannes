import { sequence } from 'astro:middleware';

import { cacheHeaders } from './cacheHeaders.ts';
import { securityHeaders } from './securityHeaders.ts';

const middleware = () => sequence(securityHeaders, cacheHeaders);

export const onRequest = middleware();
