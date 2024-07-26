import { CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY } from 'astro:env/server';
import { clerkMiddleware } from '@clerk/astro/server';

export const onRequest = clerkMiddleware({
  publishableKey: CLERK_PUBLISHABLE_KEY,
  secretKey: CLERK_SECRET_KEY,
});
