FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm ci

FROM deps AS builder
COPY apps/backend ./apps/backend
RUN npm run build -w skitza-backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm ci --omit=dev

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 4000
CMD ["node", "apps/backend/dist/server.js"]
