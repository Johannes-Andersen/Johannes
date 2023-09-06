FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --quiet --no-audit

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules 
COPY . .

# Next.js collects completely anonymous telemetry data about general usage. Disabling this.
ENV NEXT_TELEMETRY_DISABLED 1
ARG DISCORD_ID
ENV DISCORD_ID $DISCORD_ID

RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app


ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG DISCORD_ID
ENV DISCORD_ID $DISCORD_ID

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/ ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]