FROM node:23 AS base
WORKDIR /app

ARG DISCORD_SNOWFLAKE
ENV DISCORD_SNOWFLAKE=${DISCORD_SNOWFLAKE}

COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm ci --omit=dev

FROM base AS build-deps
RUN npm install --production=false

FROM build-deps AS build
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12 AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV TZ=Europe/Oslo
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["./dist/server/entry.mjs"]
