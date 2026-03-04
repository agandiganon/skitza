FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json
RUN npm ci

FROM deps AS builder
ARG BACKEND_ORIGIN=http://backend:4000
ENV BACKEND_ORIGIN=$BACKEND_ORIGIN

COPY frontend ./frontend
RUN npm run build -w frontend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ARG BACKEND_ORIGIN=http://backend:4000
ENV BACKEND_ORIGIN=$BACKEND_ORIGIN

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json
RUN npm ci --omit=dev

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/next.config.ts ./frontend/next.config.ts
COPY --from=builder /app/frontend/next-env.d.ts ./frontend/next-env.d.ts
COPY --from=builder /app/frontend/tsconfig.json ./frontend/tsconfig.json

EXPOSE 3000
CMD ["npm", "run", "start", "-w", "frontend", "--", "--port", "3000", "--hostname", "0.0.0.0"]
