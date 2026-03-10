import { defineMiddleware } from 'astro:middleware';

export const cloudflareCache = defineMiddleware(async (ctx, next) => {
  const request = ctx.request;
  const cache = ctx.locals.runtime.caches.default;
  const requestUrl = new URL(request.url);
  // biome-ignore lint/suspicious/noExplicitAny: Astro and Cloudflare types are not compatible
  const cacheKey = new Request(requestUrl.toString(), request as any) as any;

  // If the request is cached, return the cached response
  const cachedResponse = (await cache.match(cacheKey)) as Response | undefined;
  if (cachedResponse) return new Response(cachedResponse.body, cachedResponse);

  // If the request is not cached, fetch the response and cache it
  // biome-ignore lint/suspicious/noExplicitAny: Astro and Cloudflare types are not compatible
  const response = (await next()) as any;
  await cache.put(cacheKey, response.clone());

  return response;
});
