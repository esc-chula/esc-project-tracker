FROM node:18-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine as base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner
WORKDIR /app
COPY . .
# Prune https://turbo.build/repo/docs/guides/tools/docker
RUN turbo prune --scope=api --docker


# Build project***
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=api
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src


FROM alpine AS runner
ARG PROJECT=api

# not running as root ( just for security )
RUN addgroup --system --gid 1001 esc-api
RUN adduser --system --uid 1001 esc-api
USER esc-api

WORKDIR /app
COPY --from=builder --chown=esc-api:nodejs /app .
WORKDIR /app/apps/api

CMD node dist/main
