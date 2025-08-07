import { describe, expect, it, vi } from 'vitest';
import { cloudflareCache } from '../cloudflareCache.ts';

describe('cloudflareCache middleware', () => {
  it('returns cached response for GET requests', async () => {
    const cachedResponse = new Response('cached', {
      headers: { 'x-test': '1' },
    });
    const match = vi.fn().mockResolvedValue(cachedResponse);
    const put = vi.fn();
    const next = vi.fn();

    const ctx = {
      request: new Request('https://example.com', { method: 'GET' }),
      locals: { runtime: { caches: { default: { match, put } } } },
    } as any;

    const response = await cloudflareCache(ctx, next);

    expect(match).toHaveBeenCalledOnce();
    expect(next).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    if (!response) throw new Error('Response is undefined');
    expect(await response.text()).toBe('cached');
    expect(response.headers.get('x-test')).toBe('1');
  });

  it('bypasses cache for non-GET requests', async () => {
    const match = vi.fn();
    const put = vi.fn();
    const next = vi.fn().mockResolvedValue(new Response('fresh'));

    const ctx = {
      request: new Request('https://example.com', { method: 'POST' }),
      locals: { runtime: { caches: { default: { match, put } } } },
    } as any;

    const response = await cloudflareCache(ctx, next);

    expect(match).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledOnce();
    if (!response) throw new Error('Response is undefined');
    expect(await response.text()).toBe('fresh');
  });
});
