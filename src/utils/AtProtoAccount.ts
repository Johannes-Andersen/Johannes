import { Client } from '@atproto/lex';
import {
  PasswordSession,
  type SessionData,
} from '@atproto/lex-password-session';

interface Cache {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

interface AccountConfig {
  serviceAccount: string;
  password: string;
  service: string;
  cache: Cache;
}

const clientOptions = {
  validateRequest: true,
  validateResponse: true,
  strictResponseProcessing: true,
} as const;

function normalizeServiceUrl(service: string): string {
  return new URL(service).origin;
}

export class AtProtoAccount {
  private config: AccountConfig;
  private cache: Cache;
  private service: string;
  private session?: PasswordSession;

  constructor(config: AccountConfig) {
    this.config = config;
    this.cache = config.cache;
    this.service = normalizeServiceUrl(config.service);
  }

  private createClient(): Client {
    if (!this.session) throw new Error('Cannot create client without session');

    return new Client(this.session, clientOptions);
  }

  async logout(): Promise<boolean> {
    try {
      console.info('Logging out account');
      await this.session?.logout();
      console.info('Successfully logged out');
      return true;
    } catch (error) {
      console.error(error, 'Failed to logout account');
      return false;
    }
  }

  private async persistSession(data: SessionData) {
    try {
      await this.cache.put(this.config.serviceAccount, JSON.stringify(data));
      console.debug('Persisted session data');
    } catch (error) {
      console.error(error, 'Failed to persist session');
    }
  }

  private async removeSession() {
    try {
      await this.cache.delete(this.config.serviceAccount);
      console.debug('Removed session data');
    } catch (error) {
      console.error(error, 'Failed to persist session');
    }
  }

  private async loadSession(): Promise<SessionData | null> {
    try {
      const sessionData = await this.cache.get(this.config.serviceAccount);
      if (!sessionData) return null;

      return {
        ...JSON.parse(sessionData),
        service: this.service,
      };
    } catch (error) {
      console.debug('Error while trying to load session', error);
      return null;
    }
  }

  async getClient(): Promise<Client> {
    const hooks = {
      onUpdated: (data: SessionData) => this.persistSession(data),
      onDeleted: () => this.removeSession(),
    };

    // Try to resume from saved session first
    const savedSession = await this.loadSession();
    if (savedSession) {
      try {
        console.debug('Attempting to resume session');
        this.session = await PasswordSession.resume(savedSession, hooks);
        console.debug('Successfully resumed session');
        return this.createClient();
      } catch (error) {
        console.warn('Failed to resume session, will try fresh login', error);
      }
    }

    // If no session or resume failed, do a fresh login
    console.debug('Performing fresh login');
    this.session = await PasswordSession.login({
      service: this.service,
      identifier: this.config.serviceAccount,
      password: this.config.password,
      ...hooks,
    });
    console.debug('Successfully logged in');

    return this.createClient();
  }
}
