import { AtpAgent } from '@atproto/api';
import type { AtpSessionData, AtpSessionEvent } from '@atproto/api';

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

export class AtProtoAccount {
  private agent: AtpAgent;
  private config: AccountConfig;
  private cache: Cache;

  constructor(config: AccountConfig) {
    this.config = config;
    this.agent = new AtpAgent({
      service: this.config.service,
      persistSession: this.persistSession.bind(this),
    });
    this.cache = config.cache;
  }

  async logout() {
    try {
      console.info('Logging out account');
      await this.agent.logout();
      console.info('Successfully logged out');
    } catch (error) {
      console.error(error, 'Failed to logout account');
    }
  }

  private async persistSession(_evt: AtpSessionEvent, sess?: AtpSessionData) {
    try {
      if (sess) {
        this.cache.put(this.config.serviceAccount, JSON.stringify(sess));

        console.debug('Persisted session data');
      } else {
        // Session was deleted, delete session
        await this.cache.delete(this.config.serviceAccount);
        console.debug('Removed session data');
      }
    } catch (error) {
      console.error(error, 'Failed to persist session');
    }
  }

  private async loadSession(): Promise<AtpSessionData | null> {
    try {
      const sessionData = await this.cache.get(this.config.serviceAccount);
      if (!sessionData) return null;

      return JSON.parse(sessionData);
    } catch (error) {
      console.debug('Error while trying to load session', error);
      return null;
    }
  }

  async getAgent(): Promise<AtpAgent> {
    // Try to resume from saved session first
    const savedSession = await this.loadSession();
    if (savedSession) {
      try {
        console.debug('Attempting to resume session');
        const session = await this.agent.resumeSession(savedSession);
        if (!session.success) throw new Error('Failed to resume session');

        console.debug('Successfully resumed session');
        return this.agent;
      } catch (error) {
        console.warn('Failed to resume session, will try fresh login', error);
      }
    }

    // If no session or resume failed, do a fresh login
    console.debug('Performing fresh login');
    await this.agent.login({
      identifier: this.config.serviceAccount,
      password: this.config.password,
    });
    console.debug('Successfully logged in');

    return this.agent;
  }
}
