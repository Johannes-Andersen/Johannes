import { describe, expect, it, vi } from 'vitest';

import { cacheHeaders } from '../cacheHeaders.ts';

describe('cacheHeaders middleware', () => {
  it('should set Cache-Control header for 2xx responses with GET method', async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>(),
      status: 200,
    });

    const response = await cacheHeaders(
      { request: { method: 'GET' } } as any,
      next,
    );

    expect(response).toBeDefined();
    if (!response) throw new Error('Response is undefined');

    expect(response.headers.get('Cache-Control')).toBe(
      'max-age=86400, stale-while-revalidate=86400, stale-if-error=259200',
    );
  });

  it('should set Cache-Control header for 404 responses with GET method', async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>(),
      status: 404,
    });

    const response = await cacheHeaders(
      { request: { method: 'GET' } } as any,
      next,
    );

    expect(response).toBeDefined();
    if (!response) throw new Error('Response is undefined');

    expect(response.headers.get('Cache-Control')).toBe(
      'max-age=300, s-maxage=300',
    );
  });

  it('should not set Cache-Control header for non-GET methods', async () => {
    const headers = new Map<string, string>();
    const next = vi.fn().mockResolvedValue({
      headers,
      status: 200,
    });

    const response = await cacheHeaders(
      { request: { method: 'POST' } } as any,
      next,
    );

    expect(response).toBeDefined();
    if (!response) throw new Error('Response is undefined');

    expect(response.headers.has('Cache-Control')).toBe(false);
  });
});
