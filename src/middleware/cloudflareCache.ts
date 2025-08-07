import { defineMiddleware } from 'astro:middleware';

export const cloudflareCache = defineMiddleware(async (ctx, next) => {
  const { request, locals } = ctx;

  // Only cache GET requests. Other methods are not cacheable and may cause
  // unexpected behaviour if cached.
  if (request.method !== 'GET') return next();

  const cache = locals.runtime.caches.default;
  const requestUrl = new URL(request.url);
  // biome-ignore lint/suspicious/noExplicitAny: Astro and Cloudflare types are not compatible
  const cacheKey = new Request(requestUrl.toString(), request as any) as any;

  // If the request is cached, return it directly
  const cachedResponse = (await cache.match(cacheKey)) as Response | undefined;
  if (cachedResponse) return cachedResponse;

  // If the request is not cached, fetch the response and cache it
  // biome-ignore lint/suspicious/noExplicitAny: Astro and Cloudflare types are not compatible
  const response = (await next()) as any;
  await cache.put(cacheKey, response.clone());

  return response;
});
