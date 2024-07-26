import { CLERK_PUBLISHABLE_KEY, getSecret } from 'astro:env/server';
import { clerkMiddleware } from '@clerk/astro/server';

const CLERK_SECRET_KEY = getSecret('CLERK_SECRET_KEY');

export const onRequest = clerkMiddleware({
  publishableKey: CLERK_PUBLISHABLE_KEY,
  secretKey: CLERK_SECRET_KEY || '',
});
