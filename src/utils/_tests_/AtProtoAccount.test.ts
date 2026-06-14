import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';

import { AtProtoAccount } from '../AtProtoAccount.ts';

interface Cache {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

const mockLogin = vi.hoisted(() => vi.fn());
const mockResume = vi.hoisted(() => vi.fn());
const mockLogout = vi.hoisted(() => vi.fn());

let capturedLoginOptions: any;
let capturedResumeData: any;
let capturedClientOptions: any;

vi.mock('@atproto/lex-password-session', () => {
  return {
    PasswordSession: {
      login: mockLogin,
      resume: mockResume,
    },
  };
});

vi.mock('@atproto/lex', () => {
  return {
    Client: class MockClient {
      options: unknown;
      session: unknown;
      constructor(session: unknown, options: unknown) {
        this.session = session;
        this.options = options;
        capturedClientOptions = options;
      }
    },
  };
});

describe('AtProtoAccount', () => {
  let mockCache: Cache;
  let account: AtProtoAccount;
  const baseConfig = {
    serviceAccount: 'test@example.com',
    password: 'testpassword',
    service: 'https://example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    capturedLoginOptions = undefined;
    capturedResumeData = undefined;
    capturedClientOptions = undefined;
    mockLogin.mockImplementation((opts: any) => {
      capturedLoginOptions = opts;
      return Promise.resolve({ logout: mockLogout });
    });
    mockResume.mockImplementation((data: any, _opts: any) => {
      capturedResumeData = data;
      return Promise.resolve({ logout: mockLogout });
    });
    mockCache = {
      get: vi.fn(),
      put: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
    };
    account = new AtProtoAccount({ ...baseConfig, cache: mockCache });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('session hooks', () => {
    it('should store session data via onUpdated hook', async () => {
      const debugSpy = vi.spyOn(console, 'debug');
      (mockCache.get as Mock).mockResolvedValue(null);
      await account.getClient();

      const sess = { accessJwt: 'abc', refreshJwt: 'def' } as any;
      await capturedLoginOptions.onUpdated(sess);

      expect(mockCache.put).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify(sess),
      );
      expect(debugSpy).toHaveBeenCalledWith('Persisted session data');
    });

    it('should delete session data via onDeleted hook', async () => {
      const debugSpy = vi.spyOn(console, 'debug');
      (mockCache.get as Mock).mockResolvedValue(null);
      await account.getClient();

      await capturedLoginOptions.onDeleted();

      expect(mockCache.delete).toHaveBeenCalledWith('test@example.com');
      expect(debugSpy).toHaveBeenCalledWith('Removed session data');
    });

    it('should handle errors when storing session data', async () => {
      const err = new Error('fail');
      const errorSpy = vi.spyOn(console, 'error');
      (mockCache.get as Mock).mockResolvedValue(null);
      (mockCache.put as Mock).mockRejectedValueOnce(err);
      await account.getClient();

      await capturedLoginOptions.onUpdated({
        accessJwt: 'x',
        refreshJwt: 'y',
      });

      expect(mockCache.put).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify({ accessJwt: 'x', refreshJwt: 'y' }),
      );
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to persist session');
    });

    it('should handle errors when deleting session data', async () => {
      const err = new Error('fail delete');
      const errorSpy = vi.spyOn(console, 'error');
      (mockCache.get as Mock).mockResolvedValue(null);
      (mockCache.delete as Mock).mockRejectedValueOnce(err);
      await account.getClient();

      await capturedLoginOptions.onDeleted();

      expect(mockCache.delete).toHaveBeenCalledWith('test@example.com');
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to persist session');
    });
  });

  describe('getClient', () => {
    it('should resume session if valid session exists in cache', async () => {
      const data = JSON.stringify({ accessJwt: 'a', refreshJwt: 'b' });

      (mockCache.get as Mock).mockResolvedValue(data);
      await account.getClient();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockResume).toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
      expect(capturedClientOptions).toEqual({
        validateRequest: true,
        validateResponse: true,
        strictResponseProcessing: true,
      });
    });

    it('should normalize cached session service before resume', async () => {
      const data = JSON.stringify({
        accessJwt: 'a',
        refreshJwt: 'b',
        service: 'partall.no',
      });

      (mockCache.get as Mock).mockResolvedValue(data);
      await account.getClient();

      expect(capturedResumeData).toMatchObject({
        accessJwt: 'a',
        refreshJwt: 'b',
        service: 'https://example.com',
      });
    });

    it('should perform fresh login if no session exists in cache', async () => {
      (mockCache.get as Mock).mockResolvedValue(null);

      await account.getClient();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockResume).not.toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalled();
      expect(capturedLoginOptions).toMatchObject({
        service: 'https://example.com',
        identifier: 'test@example.com',
        password: 'testpassword',
      });
      expect(capturedClientOptions).toEqual({
        validateRequest: true,
        validateResponse: true,
        strictResponseProcessing: true,
      });
    });

    it('should perform fresh login if session resume fails', async () => {
      const errorSpy = vi.spyOn(console, 'warn');
      const error = new Error('resume fail');
      const data = JSON.stringify({ accessJwt: 'a', refreshJwt: 'b' });

      (mockCache.get as Mock).mockResolvedValue(data);
      mockResume.mockRejectedValueOnce(error);

      await account.getClient();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockResume).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalled();
      expect(capturedLoginOptions).toMatchObject({
        identifier: 'test@example.com',
        password: 'testpassword',
      });
      expect(errorSpy).toHaveBeenCalledWith(
        'Failed to resume session, will try fresh login',
        error,
      );
    });

    it('should handle errors when loading session from cache', async () => {
      (mockCache.get as Mock).mockResolvedValue('not-json');
      const debugSpy = vi.spyOn(console, 'debug');

      await account.getClient();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(debugSpy).toHaveBeenCalledWith(
        'Error while trying to load session',
        expect.any(Error),
      );
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call session logout method', async () => {
      (mockCache.get as Mock).mockResolvedValue(null);
      await account.getClient();

      const ok = await account.logout();

      expect(ok).toBe(true);
      expect(mockLogout).toHaveBeenCalled();
    });

    it('should be a no-op when no session has been created', async () => {
      const ok = await account.logout();

      expect(ok).toBe(true);
      expect(mockLogout).not.toHaveBeenCalled();
    });

    it('should handle errors during logout', async () => {
      const err = new Error('logout fail');
      const errorSpy = vi.spyOn(console, 'error');
      (mockCache.get as Mock).mockResolvedValue(null);
      await account.getClient();
      mockLogout.mockRejectedValueOnce(err);

      const ok = await account.logout();

      expect(ok).toBe(false);
      expect(mockLogout).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to logout account');
    });
  });
});
