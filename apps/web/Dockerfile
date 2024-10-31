FROM node:18-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat


FROM alpine as base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store


FROM base AS pruner
WORKDIR /app
# we also need trpc from apps/api
COPY apps ./apps  
COPY package.json ./package.json  
COPY packages ./packages
COPY pnpm-lock.yaml ./pnpm-lock.yaml  
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml  
COPY turbo.json ./turbo.json
# read more https://turbo.build/repo/docs/reference/prune
RUN turbo prune --scope=web --docker


FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_SERVER_URL

ENV NEXT_PUBLIC_API_SERVER_URL=$NEXT_PUBLIC_API_SERVER_URL

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=web --env-mode=loose
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional

FROM base AS runner
# run as non-root user
RUN addgroup --system --gid 1001 esc-web
RUN adduser --system --uid 1001 esc-web
USER esc-web

WORKDIR /app
# optimize for Next.js
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=esc-web:esc-web /app/apps/web/.next/standalone ./
COPY --from=builder --chown=esc-web:esc-web /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=esc-web:esc-web /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD node apps/web/server.js