FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npm run prisma:generate

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json ./

RUN npm install --omit-dev

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
