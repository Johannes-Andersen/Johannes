import { sequence } from 'astro:middleware';

import securityHeaders from './securityHeaders';
import cacheHeaders from './cacheHeaders';

const middleware = () => sequence(securityHeaders, cacheHeaders);

export const onRequest = middleware();
