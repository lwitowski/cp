FROM node:alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:alpine
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]