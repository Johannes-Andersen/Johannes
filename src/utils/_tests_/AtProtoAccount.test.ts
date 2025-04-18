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

let capturedPersistSessionCallback:
  | ((evt: any, sess?: any) => Promise<undefined>)
  | undefined;

const mockLogin = vi.fn().mockResolvedValue({ success: true });
const mockLogout = vi.fn().mockResolvedValue({ success: true });
const mockResumeSession = vi.fn().mockResolvedValue({ success: true });

vi.mock('@atproto/api', () => ({
  // biome-ignore lint/style/useNamingConvention: External library
  AtpAgent: vi.fn().mockImplementation(({ persistSession }) => {
    capturedPersistSessionCallback = persistSession;
    return {
      login: mockLogin,
      logout: mockLogout,
      resumeSession: mockResumeSession,
    };
  }),
}));

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
    capturedPersistSessionCallback = undefined;
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

  describe('persistSession callback', () => {
    let cb: NonNullable<typeof capturedPersistSessionCallback> | undefined;

    beforeEach(() => {
      cb = capturedPersistSessionCallback;
    });

    it('should store session data when session is provided', async () => {
      const debugSpy = vi.spyOn(console, 'debug');
      const sess = { accessJwt: 'abc', refreshJwt: 'def' };

      expect(cb).toBeDefined();
      await cb?.({}, sess);

      expect(mockCache.put).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify(sess),
      );
      expect(debugSpy).toHaveBeenCalledWith('Persisted session data');
    });

    it('should delete session data when no session is provided', async () => {
      const debugSpy = vi.spyOn(console, 'debug');

      expect(cb).toBeDefined();
      await cb?.({});

      expect(mockCache.delete).toHaveBeenCalledWith('test@example.com');
      expect(debugSpy).toHaveBeenCalledWith('Removed session data');
    });

    it('should handle errors when storing session data', async () => {
      const err = new Error('fail');
      const errorSpy = vi.spyOn(console, 'error');
      (mockCache.put as Mock).mockRejectedValueOnce(err);

      expect(cb).toBeDefined();
      await cb?.({}, { accessJwt: 'x', refreshJwt: 'y' });

      expect(mockCache.put).toHaveBeenCalledWith(
        'test@example.com',
        JSON.stringify({ accessJwt: 'x', refreshJwt: 'y' }),
      );
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to persist session');
    });

    it('should handle errors when deleting session data', async () => {
      const err = new Error('fail delete');
      const errorSpy = vi.spyOn(console, 'error');
      (mockCache.delete as Mock).mockRejectedValueOnce(err);

      expect(cb).toBeDefined();
      await cb?.({});

      expect(mockCache.delete).toHaveBeenCalledWith('test@example.com');
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to persist session');
    });
  });

  describe('getAgent', () => {
    it('should resume session if valid session exists in cache', async () => {
      const data = JSON.stringify({ accessJwt: 'a', refreshJwt: 'b' });

      (mockCache.get as Mock).mockResolvedValue(data);
      await account.getAgent();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockResumeSession).toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should perform fresh login if no session exists in cache', async () => {
      (mockCache.get as Mock).mockResolvedValue(null);

      await account.getAgent();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockResumeSession).not.toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'testpassword',
      });
    });

    it('should perform fresh login if session resume fails', async () => {
      const errorSpy = vi.spyOn(console, 'warn');
      const error = new Error('resume fail');
      const data = JSON.stringify({ accessJwt: 'a', refreshJwt: 'b' });

      (mockCache.get as Mock).mockResolvedValue(data);
      mockResumeSession.mockRejectedValueOnce(error);

      await account.getAgent();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(mockLogin).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'testpassword',
      });
      expect(mockResumeSession).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        'Failed to resume session, will try fresh login',
        error,
      );
    });

    it('should handle errors when loading session from cache', async () => {
      (mockCache.get as Mock).mockResolvedValue('not-json');
      const debugSpy = vi.spyOn(console, 'debug');

      await account.getAgent();

      expect(mockCache.get).toHaveBeenCalledWith('test@example.com');
      expect(debugSpy).toHaveBeenCalledWith(
        'Error while trying to load session',
        expect.any(Error),
      );
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call agent logout method', async () => {
      const ok = await account.logout();

      expect(ok).toBe(true);
      expect(mockLogout).toHaveBeenCalled();
    });

    it('should handle errors during logout', async () => {
      const err = new Error('logout fail');
      const errorSpy = vi.spyOn(console, 'error');
      mockLogout.mockRejectedValueOnce(err);

      const ok = await account.logout();

      expect(ok).toBe(false);
      expect(mockLogout).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(err, 'Failed to logout account');
    });
  });
});
