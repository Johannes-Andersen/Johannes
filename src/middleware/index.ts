import { sequence } from 'astro:middleware';

import cacheHeaders from './cacheHeaders';
import securityHeaders from './securityHeaders';

const middleware = () => sequence(securityHeaders, cacheHeaders);

export const onRequest = middleware();
