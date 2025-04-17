import { defineMiddleware } from 'astro:middleware';

const cacheHeaders = defineMiddleware(async ({ request }, next) => {
  const response = await next();

  // Only apply cache headers to GET requests
  if (request.method !== 'GET') return response;

  const { headers } = response;

  // 2xx responses
  if (response.status >= 200 && response.status < 300)
    headers.set(
      'Cache-Control',
      'max-age=86400, stale-while-revalidate=86400, stale-if-error=259200',
    );

  // 404 response
  if (response.status === 404)
    headers.set('Cache-Control', 'max-age=300, s-maxage=300');

  return response;
});

export default cacheHeaders;
