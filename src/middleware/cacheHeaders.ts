import { defineMiddleware } from 'astro:middleware';

const cacheHeaders = defineMiddleware(async (_, next) => {
  const response = await next();
  const { headers } = response;

  headers.set(
    'Cache-Control',
    'public, max-age=300, s-maxage=86400, stale-while-revalidate=86400, stale-if-error=259200, must-revalidate',
  );
  headers.set(
    'Cloudflare-CDN-Cache-Control',
    'max-age=86400, stale-while-revalidate=86400, stale-if-error=259200',
  );

  return response;
});

export default cacheHeaders;
