import type { AtpSessionData, AtpSessionEvent } from '@atproto/api';
import { AtpAgent } from '@atproto/api';
import { db, eq, Session } from 'astro:db';

interface AccountConfig {
  serviceAccount: string;
  password: string;
  service: string;
}

export class AtProtoAccount {
  private agent: AtpAgent;
  private config: AccountConfig;

  constructor(config: AccountConfig) {
    this.config = config;
    this.agent = new AtpAgent({
      service: this.config.service,
      persistSession: this.persistSession.bind(this),
    });
  }

  async logout(): Promise<boolean> {
    try {
      console.info('Logging out account');
      await this.agent.logout();
      console.info('Successfully logged out');
      return true;
    } catch (error) {
      console.error(error, 'Failed to logout account');
      return false;
    }
  }

  private async persistSession(evt: AtpSessionEvent, sess?: AtpSessionData) {
    try {
      if (sess) {
        await db
          .insert(Session)
          .values({
            ...sess,
            did: this.config.serviceAccount,
          })
          .onConflictDoUpdate({
            target: Session.did,
            set: sess,
          });

        console.debug(`[${evt}] Persisted session data`);
      } else {
        // Session was deleted, delete session
        await db
          .delete(Session)
          .where(eq(Session.did, this.config.serviceAccount));

        console.debug(`[${evt}] Removed session data`);
      }
    } catch (error) {
      console.error(error, `[${evt}] Failed to persist session`);
    }
  }

  private async loadSession(): Promise<AtpSessionData | null> {
    try {
      const sessionData = await db
        .select()
        .from(Session)
        .where(eq(Session.did, this.config.serviceAccount));

      if (!sessionData?.length) return null;
      const session = sessionData[0];
      if (!session) return null;

      return session as AtpSessionData;
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
