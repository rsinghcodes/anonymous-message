FROM node:20.15.0-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci;

COPY prisma/ ./prisma/

RUN npm run prisma:migrate
RUN npm run prisma:generate

COPY . .

# disable telemetry at build time
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build;

FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Disabled telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]

