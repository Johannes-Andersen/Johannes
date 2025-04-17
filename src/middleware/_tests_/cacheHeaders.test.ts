import { describe, expect, it, vi } from 'vitest';
import cacheHeaders from '../cacheHeaders';

describe('cacheHeaders middleware', () => {
  it('should set Cache-Control header', async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>(),
    });

    const response = await cacheHeaders({} as any, next);

    if (!response) {
      throw new Error('Response is undefined');
    }

    const cacheControl =
      'public, max-age=300, s-maxage=86400, stale-while-revalidate=86400, stale-if-error=259200, must-revalidate';

    expect(response.headers.get('Cache-Control')).toBe(cacheControl);
    expect(response.headers.get('CDN-Cache-Control')).toBe(cacheControl);
  });
});
