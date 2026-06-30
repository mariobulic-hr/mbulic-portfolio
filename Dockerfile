# Stage 1: Build
FROM node:20-alpine AS builder

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev

RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm build

# Stage 2: Production
FROM node:20-alpine AS runner

RUN apk add --no-cache vips

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-deprecation

EXPOSE 3000

# Run the Next.js binary directly — no pnpm/corepack at runtime
CMD ["node_modules/.bin/next", "start"]
