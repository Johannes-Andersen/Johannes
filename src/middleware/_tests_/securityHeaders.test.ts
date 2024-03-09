import { describe, expect, it, vi } from 'vitest';
import securityHeaders from '../securityHeaders';

describe('securityHeaders middleware', () => {
  it('should set security headers for HTML documents', async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>(),
    });

    const response = await securityHeaders({} as any, next);

    if (!response) {
      throw new Error('Response is undefined');
    }

    const headers = response.headers;

    expect(headers.get('x-xss-protection')).toBe('1; mode=block');
    expect(headers.get('x-content-type-options')).toBe('nosniff');
    expect(headers.get('referrer-policy')).toBe('same-origin');
    expect(headers.get('x-frame-options')).toBe('DENY');

    expect(headers.get('permissions-policy')).toBe(
      [
        'accelerometer=()',
        'autoplay=(self)',
        'camera=()',
        'cross-origin-isolated=()',
        'display-capture=()',
        'encrypted-media=()',
        'fullscreen=(self)',
        'geolocation=()',
        'gyroscope=()',
        'keyboard-map=()',
        'magnetometer=()',
        'microphone=()',
        'midi=()',
        'payment=()',
        'picture-in-picture=(self)',
        'publickey-credentials-get=()',
        'screen-wake-lock=()',
        'sync-xhr=(self)',
        'usb=()',
        'xr-spatial-tracking=()',
        'clipboard-read=(self)',
        'clipboard-write=(self)',
        'gamepad=()',
        'hid=()',
        'idle-detection=()',
        'unload=()',
      ].join(', '),
    );

    expect(headers.get('cross-origin-opener-policy')).toBe('same-origin');
    expect(headers.get('cross-origin-resource-policy')).toBe('same-origin');
    expect(headers.get('cross-origin-embedder-policy')).toBe('require-corp');

    expect(headers.get('report-to')).toBe(
      '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://johand.report-uri.com/a/d/g"}],"include_subdomains":true}',
    );
    expect(headers.get('NEL')).toBe(
      '{"report_to":"default","max_age":31536000,"include_subdomains":true}',
    );

    expect(headers.get('content-security-policy')).toBeDefined();
  });

  it('should not set security headers for non-HTML documents', async () => {
    const next = vi.fn().mockResolvedValue({
      headers: new Map<string, string>([['content-type', 'application/json']]),
    });

    const response = await securityHeaders({} as any, next);

    expect(response).toEqual({
      headers: new Map<string, string>([['content-type', 'application/json']]),
    });
  });
});
