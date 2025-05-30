import { describe, expect, it } from 'vitest';

import { GET } from '../health.ts';

describe('GET /api/health', () => {
  it("should return status 200 and 'ok' message", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const data = (await response.json()) as { status: string };
    expect(data.status).toBe('ok');
  });
});
