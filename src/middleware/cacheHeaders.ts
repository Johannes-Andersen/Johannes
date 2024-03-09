import { defineMiddleware } from 'astro:middleware';

const cacheHeaders = defineMiddleware(async (_, next) => {
  const response = await next();
  const { headers } = response;

  headers.set('Cache-Control', 'must-revalidate, max-age=0');

  return response;
});

export default cacheHeaders;
